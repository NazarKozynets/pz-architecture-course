import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

type SuccessStatus = 'ok' | 'created';

interface ApiEndpointResponsesOptions {
  successStatus?: SuccessStatus;
  successDescription: string;
  successType?: Type<unknown>;
  notFoundMessage?: string;
  badRequestMessage?: string;
  conflictMessage?: string;
  unauthorizedMessage?: string;
}

export function ApiEndpointResponses(options: ApiEndpointResponsesOptions) {
  const {
    successStatus = 'ok',
    successDescription,
    successType,
    notFoundMessage = 'Not Found',
    badRequestMessage = 'Bad Request',
    conflictMessage = 'Conflict',
    unauthorizedMessage = 'Unauthorized',
  } = options;

  const successDecorator =
    successStatus === 'created'
      ? ApiCreatedResponse({
          description: successDescription,
          ...(successType && { type: successType }),
        })
      : ApiOkResponse({
          description: successDescription,
          ...(successType && { type: successType }),
        });

  return applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    successDecorator,

    ApiBadRequestResponse({
      description: badRequestMessage,
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
        example: {
          statusCode: 400,
          message: ['price must not be less than 0'],
          error: 'Bad Request',
        },
      },
    }),

    ApiUnauthorizedResponse({
      description: unauthorizedMessage,
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    }),

    ApiNotFoundResponse({
      description: notFoundMessage,
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
        example: {
          statusCode: 404,
          message: notFoundMessage,
          error: 'Not Found',
        },
      },
    }),

    ApiConflictResponse({
      description: conflictMessage,
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
        example: {
          statusCode: 409,
          message: conflictMessage,
          error: 'Conflict',
        },
      },
    }),

    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      schema: {
        allOf: [{ $ref: getSchemaPath(ErrorResponseDto) }],
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
}
