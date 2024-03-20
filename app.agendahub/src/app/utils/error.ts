import { MessageService } from "primeng/api";
import { AuthService } from "../auth/auth-service.service";

export class ErrorHandler {

    public static templateError(request: any, messages: MessageService, auth: AuthService) {
        
        if (request.status) {

            if (request.error?.hasError) {
              messages.add({severity: "error", summary: "Erro ao salvar!", detail: this.handleErrorMessage(request.error.errorDescription)});
              return void 0;
            }
      
            if (request.status >= 400 && request.status < 500) {
      
              if (request.status === 401) {
                auth.logout(() => messages.add({severity: "error", summary: "Erro ao validar identidade!", detail: "É necessário realizar o login."}));
                return void 0;
              }
      
            } else {
              messages.add({severity: "error", summary: "Erro desconhecido!", detail: request.message});
            }
      
          }
    }

    /**
     * @description Method to handle error messages
     * @param error ErrorDescription from server
     * @returns string
     */
    private static handleErrorMessage(error: string) {
        return error.includes("Exception") ? this.detectError(error) : error;
    }

    /**
     * @remarks This method uses regular expressions to detect errors and must return a valueable message to the user
     * @description Method to detect error
     * @param error ErrorDescription from server
     * @returns string 
     * @step 1 To add a new error message, add a new key to ERRORS_MESSAGES
     * @step 2 A new key to ERROR_DETECTORS (this key must be the same as the key in ERRORS_MESSAGES)
     * @step 3 The value must be a regular expression to detect the error (look at errorDescription of request to find a pattern)
     * 
     */
    private static detectError(error: string) {
        for (let key in this.ERROR_DETECTORS) {
            for (let errorKey in this.ERROR_DETECTORS[key]) {
                if (this.ERROR_DETECTORS[key][errorKey].test(error)) {
                    return this.ERRORS_MESSAGES[key][errorKey];
                }
            }
        }

        return "Erro desconhecido!";
    }

    /**
     * @description Object with error messages
     */
    private static ERRORS_MESSAGES : Record<string | symbol, any> = {
        USER: {
            EMAIL_EXISTS: "Já existe um usuário com esse e-mail!",
            PHONE_EXISTS: "Já existe um usuário com esse telefone!",
            USER_REF: "Esse usuário possui referência! Desative as referências antes de desativar o usuário!"
        },
        SERVICE: {
            SERVICE_REF: "Esse serviço possui referência! Desative as referências antes de desativar o serviço!"
        }
    }

    /**
     * @description Object with regular expressions to detect errors
     */
    private static ERROR_DETECTORS : Record<string | symbol, any> = {
        USER: {
            EMAIL_EXISTS: /unique constraint "User_email_key"/i,
            PHONE_EXISTS: /unique constraint "User_phone_key"/i,
            USER_REF: /delete on table "User" violates foreign key constraint/i
        },
        SERVICE: {
            SERVICE_REF: /delete on table "Service" violates foreign key constraint/i
        }
    }

}