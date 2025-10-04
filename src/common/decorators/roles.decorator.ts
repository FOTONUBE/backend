import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../enums/roles.enum'; // <-- importá tu enum

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ValidRoles[]) => SetMetadata(ROLES_KEY, roles);
