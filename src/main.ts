import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Hotel Service Management API')
    .setDescription('API documentation for hotel service management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customJsStr: `
      (function waitForSwagger() {
        if (!window.ui) {
          setTimeout(waitForSwagger, 150);
          return;
        }

        const bar = document.createElement('div');
        bar.style.cssText = [
          'display:flex',
          'align-items:center',
          'gap:8px',
          'padding:10px 20px',
          'background:#1b1b1b',
          'border-bottom:2px solid #4a90d9',
          'font-family:sans-serif',
          'font-size:14px',
        ].join(';');

        bar.innerHTML = \`
          <span style="color:#fff;font-weight:600;margin-right:4px;">Quick&nbsp;Login</span>
          <input id="ql-email"    type="email"    placeholder="Email"    value="admin@hotel.com"
            style="padding:5px 9px;border:1px solid #555;border-radius:4px;background:#2d2d2d;color:#fff;width:200px">
          <input id="ql-password" type="password" placeholder="Password" value="password1234"
            style="padding:5px 9px;border:1px solid #555;border-radius:4px;background:#2d2d2d;color:#fff;width:160px">
          <button id="ql-btn"
            style="padding:5px 16px;background:#4a90d9;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px;">
            Login
          </button>
          <span id="ql-status" style="font-size:13px;"></span>
        \`;

        document.body.insertBefore(bar, document.body.firstChild);

        document.getElementById('ql-btn').addEventListener('click', async function () {
          const email    = document.getElementById('ql-email').value.trim();
          const password = document.getElementById('ql-password').value;
          const status   = document.getElementById('ql-status');

          status.style.color = '#aaa';
          status.textContent = 'Logging in…';

          try {
            const res  = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok && data.accessToken) {
              window.ui.authActions.authorize({
                bearer: {
                  name: 'bearer',
                  schema: { type: 'http', scheme: 'bearer' },
                  value: data.accessToken,
                },
              });
              status.style.color = '#4caf50';
              status.textContent = '✓ Logged in as ' + data.email + ' (' + data.role + ')';
            } else {
              status.style.color = '#f44336';
              status.textContent = '✗ ' + (data.message || 'Login failed');
            }
          } catch (e) {
            status.style.color = '#f44336';
            status.textContent = '✗ Network error: ' + e.message;
          }
        });
      })();
    `,
  });

  await app.listen(3000);
}
void bootstrap();
