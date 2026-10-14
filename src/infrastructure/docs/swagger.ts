import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const port = process.env.PORT || '3002';
const baseUrlApi = (process.env.BASE_URL_API || 'api').replace(/^\/+|\/+$/g, '');

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ATS Market API',
      version: '1.0.0',
      description: 'API documentation for ATS Market with Clean Architecture & TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${port}/${baseUrlApi}`,
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error description message',
            },
            error: {
              type: 'string',
              example: 'Technical error details',
            },
          },
        },
        LoginDto: {
          type: 'object',
          required: ['usr_user', 'usr_password'],
          properties: {
            usr_user: {
              type: 'string',
              description: 'Username or user email',
              example: 'admin@atsmarket.com',
            },
            usr_password: {
              type: 'string',
              description: 'User password',
              example: 'SecretPassword123!',
            },
            gettoken: {
              type: 'boolean',
              description: 'Flag to request JWT token string only',
              example: true,
            },
          },
        },
        AuthSuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Inicio de sesión exitoso.',
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'JWT Bearer token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        UserEntity: {
          type: 'object',
          properties: {
            usr_uuid: {
              type: 'string',
              format: 'uuid',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            usr_name: {
              type: 'string',
              example: 'Alvaro',
            },
            usr_surname: {
              type: 'string',
              example: 'Saccomani',
            },
            usr_email: {
              type: 'string',
              format: 'email',
              example: 'alvaro@atsmarket.com',
            },
            usr_nick: {
              type: 'string',
              example: 'asaccomani',
            },
            usr_bio: {
              type: 'string',
              example: 'Fullstack Developer',
            },
            usr_socket: {
              type: 'string',
              example: 'socket_id_123',
            },
            usr_online: {
              type: 'boolean',
              example: true,
            },
            usr_createdat: {
              type: 'string',
              format: 'date-time',
            },
            usr_updatedat: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
  },
  apis: [
    './src/infrastructure/router/**/*.route.ts',
    './src/infrastructure/docs/**/*.ts',
  ],
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  const docsPath = `/${baseUrlApi}/api-docs`;

  // Swagger UI interactive documentation
  app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Swagger Raw Spec JSON
  app.get(`${docsPath}.json`, (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });

  console.log(`[Swagger] Docs UI: http://localhost:${port}${docsPath}`);
  console.log(`[Swagger] Spec JSON: http://localhost:${port}${docsPath}.json`);
};

export default setupSwagger;
