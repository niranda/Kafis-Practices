import { UserErrorCode } from '@practice/enums';

export interface UserResponse {
    isSuccess: boolean;
    errorMessage: UserErrorCode;
}
