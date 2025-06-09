type ErrorContext = Record<string, unknown> | undefined;

export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly context: ErrorContext;
    public readonly isOperational: boolean;

    constructor(
        message: string, 
        statusCode: number = 500, 
        context: ErrorContext = undefined,
        isOperational: boolean = true
    ) {
        super(message);
        
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.context = context;
        this.isOperational = isOperational;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }

    public toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            context: this.context,
            ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
        };
    }
}

export class NotFoundError extends ApiError {
    constructor(
        message: string = 'Recurso no encontrado',
        context: ErrorContext = undefined
    ) {
        super(message, 404, context);
    }
}

export class BadRequestError extends ApiError {
    constructor(
        message: string = 'Datos de solicitud inválidos',
        context: ErrorContext = undefined,
        validationErrors?: Record<string, string>
    ) {
        super(message, 400, {
            ...context,
            ...(validationErrors && { errors: validationErrors })
        });
    }
}

export class JsonReaderError extends ApiError {
    constructor(
        message: string = 'Error al leer archivo JSON',
        context: ErrorContext = undefined,
        cause?: Error
    ) {
        super(message, 500, {
            ...context,
            ...(cause && { originalError: cause.message })
        }, false);
        
        if (cause?.stack) {
            this.stack += `\nCaused by: ${cause.stack}`;
        }
    }
}