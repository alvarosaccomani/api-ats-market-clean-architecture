/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - usr_name
 *         - usr_surname
 *         - usr_email
 *         - usr_password
 *         - usr_nick
 *       properties:
 *         usr_name:
 *           type: string
 *           example: "Juan"
 *         usr_surname:
 *           type: string
 *           example: "Perez"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         usr_password:
 *           type: string
 *           format: password
 *           example: "SecretPass123!"
 *         usr_nick:
 *           type: string
 *           example: "jperez"
 *         usr_bio:
 *           type: string
 *           example: "Comprador de repuestos"
 *
 *     ConfirmAccountDto:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Token de confirmación enviado por correo
 *           example: "a8b9c7d6-e5f4-3210-fedc-ba9876543210"
 *
 *     ForgotPasswordDto:
 *       type: object
 *       required:
 *         - usr_email
 *       properties:
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "usuario@atsmarket.com"
 *
 *     ResetPasswordDto:
 *       type: object
 *       required:
 *         - token
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           description: Token recibido para reestablecer la contraseña
 *           example: "reset-token-uuid-1234"
 *         newPassword:
 *           type: string
 *           format: password
 *           example: "NewSecurePassword456!"
 *
 *     SSOVerifyDto:
 *       type: object
 *       required:
 *         - sso_token
 *       properties:
 *         sso_token:
 *           type: string
 *           description: Token emitido por el Kernel Central SSO
 *           example: "sso_federated_token_xyz"
 *
 *     SSOLogAuthDto:
 *       type: object
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         action:
 *           type: string
 *           example: "LOGIN_SUCCESS"
 *
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - usr_name
 *         - usr_surname
 *         - usr_email
 *         - usr_password
 *         - usr_nick
 *       properties:
 *         usr_name:
 *           type: string
 *           example: "Carlos"
 *         usr_surname:
 *           type: string
 *           example: "Gomez"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "carlos@example.com"
 *         usr_password:
 *           type: string
 *           format: password
 *           example: "Password123!"
 *         usr_nick:
 *           type: string
 *           example: "cgomez"
 *         usr_bio:
 *           type: string
 *           example: "Operador de Logística"
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         usr_name:
 *           type: string
 *           example: "Carlos Alberto"
 *         usr_surname:
 *           type: string
 *           example: "Gomez"
 *         usr_email:
 *           type: string
 *           format: email
 *           example: "carlos.gomez@example.com"
 *         usr_nick:
 *           type: string
 *           example: "carlosg"
 *         usr_bio:
 *           type: string
 *           example: "Jefe de Almacén"
 *
 *     RolEntity:
 *       type: object
 *       properties:
 *         rol_uuid:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         rol_name:
 *           type: string
 *           example: "ADMINISTRADOR"
 *         rol_createdat:
 *           type: string
 *           format: date-time
 *         rol_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateRolDto:
 *       type: object
 *       required:
 *         - rol_name
 *       properties:
 *         rol_name:
 *           type: string
 *           example: "SUPERVISOR"
 *
 *     UpdateRolDto:
 *       type: object
 *       required:
 *         - rol_name
 *       properties:
 *         rol_name:
 *           type: string
 *           example: "SUPERVISOR_GENERAL"
 *
 *     PermissionEntity:
 *       type: object
 *       properties:
 *         per_uuid:
 *           type: string
 *           format: uuid
 *           example: "223e4567-e89b-12d3-a456-426614174001"
 *         per_slug:
 *           type: string
 *           example: "CREATE_USER"
 *         per_description:
 *           type: string
 *           example: "Permite registrar nuevos usuarios en el sistema"
 *         rety_uuid:
 *           type: string
 *           format: uuid
 *         remo_uuid:
 *           type: string
 *           format: uuid
 *         per_createdat:
 *           type: string
 *           format: date-time
 *         per_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreatePermissionDto:
 *       type: object
 *       required:
 *         - per_slug
 *         - per_description
 *         - rety_uuid
 *         - remo_uuid
 *       properties:
 *         per_slug:
 *           type: string
 *           example: "DELETE_PRODUCT"
 *         per_description:
 *           type: string
 *           example: "Eliminar productos del catálogo"
 *         rety_uuid:
 *           type: string
 *           format: uuid
 *         remo_uuid:
 *           type: string
 *           format: uuid
 *
 *     UpdatePermissionDto:
 *       type: object
 *       properties:
 *         per_slug:
 *           type: string
 *           example: "DELETE_PRODUCT_VARIATION"
 *         per_description:
 *           type: string
 *           example: "Eliminar variaciones de productos"
 *         rety_uuid:
 *           type: string
 *           format: uuid
 *         remo_uuid:
 *           type: string
 *           format: uuid
 *
 *     RolPermissionEntity:
 *       type: object
 *       properties:
 *         rol_uuid:
 *           type: string
 *           format: uuid
 *         per_uuid:
 *           type: string
 *           format: uuid
 *         rolper_createdat:
 *           type: string
 *           format: date-time
 *         rolper_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateRolPermissionDto:
 *       type: object
 *       required:
 *         - rol_uuid
 *         - per_uuid
 *       properties:
 *         rol_uuid:
 *           type: string
 *           format: uuid
 *         per_uuid:
 *           type: string
 *           format: uuid
 *
 *     UserRolCompanyEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         rol_uuid:
 *           type: string
 *           format: uuid
 *         usrrolcmp_createdat:
 *           type: string
 *           format: date-time
 *         usrrolcmp_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateUserRolCompanyDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - usr_uuid
 *         - rol_uuid
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         rol_uuid:
 *           type: string
 *           format: uuid
 *
 *     ResourceModuleEntity:
 *       type: object
 *       properties:
 *         remo_uuid:
 *           type: string
 *           format: uuid
 *         remo_name:
 *           type: string
 *           example: "USUARIOS"
 *         remo_description:
 *           type: string
 *           example: "Módulo de gestión de usuarios"
 *         remo_createdat:
 *           type: string
 *           format: date-time
 *         remo_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateResourceModuleDto:
 *       type: object
 *       required:
 *         - remo_name
 *         - remo_description
 *       properties:
 *         remo_name:
 *           type: string
 *           example: "INVENTARIO"
 *         remo_description:
 *           type: string
 *           example: "Módulo de gestión de inventario y stock"
 *
 *     UpdateResourceModuleDto:
 *       type: object
 *       properties:
 *         remo_name:
 *           type: string
 *           example: "INVENTARIOS"
 *         remo_description:
 *           type: string
 *           example: "Módulo actualizado de inventario"
 *
 *     ResourceTypeEntity:
 *       type: object
 *       properties:
 *         rety_uuid:
 *           type: string
 *           format: uuid
 *         rety_name:
 *           type: string
 *           example: "API_ENDPOINT"
 *         rety_description:
 *           type: string
 *           example: "Recurso de tipo endpoint HTTP"
 *         rety_createdat:
 *           type: string
 *           format: date-time
 *         rety_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateResourceTypeDto:
 *       type: object
 *       required:
 *         - rety_name
 *         - rety_description
 *       properties:
 *         rety_name:
 *           type: string
 *           example: "MENU_VIEW"
 *         rety_description:
 *           type: string
 *           example: "Recurso de interfaz o vista de menú"
 *
 *     UpdateResourceTypeDto:
 *       type: object
 *       properties:
 *         rety_name:
 *           type: string
 *           example: "MENU_VISTA"
 *         rety_description:
 *           type: string
 *           example: "Recurso de interfaz actualizado"
 */

export const IDENTITY_SCHEMAS_LOADED = true;
