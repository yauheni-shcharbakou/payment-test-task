import { HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiResponseExamples } from '@nestjs/swagger';

type ExceptionExamplesObject = {
  [key: string]: ApiResponseExamples;
};

const createExamples = (messages: string[], statusCode: HttpStatus) => {
  return messages.reduce((acc: ExceptionExamplesObject, message) => {
    acc[message] = {
      summary: message,
      value: { message, statusCode },
    };

    return acc;
  }, {});
};

export const ApiBadRequestExceptions = (messages: string[]) => {
  return ApiBadRequestResponse({ examples: createExamples(messages, HttpStatus.BAD_REQUEST) });
};

export const ApiNotFoundExceptions = (messages: string[]) => {
  return ApiNotFoundResponse({ examples: createExamples(messages, HttpStatus.NOT_FOUND) });
};
