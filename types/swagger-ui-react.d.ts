declare module "swagger-ui-react" {
  import React from "react";

  type SwaggerUIProps = {
    spec: Record<string, any>;
    url?: string;
    docExpansion?: string;
    defaultModelsExpandDepth?: number;
    supportedSubmitMethods?: string[];
    onComplete?: () => void;
  };

  const SwaggerUI: React.FC<SwaggerUIProps>;
  export default SwaggerUI;
}
