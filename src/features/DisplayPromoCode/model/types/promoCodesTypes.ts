interface PromoCodeSchema {
  promoCodes: PromoCode[];
  error?: PromoCodeReject;
  isLoading: boolean;
}

interface PromoCode {
  code: string;
  description: {
    'en-US': string;
  };
  isApply?: boolean;
}

interface PromoCodeResponse {
  results: PromoCode[];
}

interface PromoCodeReject {
  statusCode: number;
  message: string;
  errors: [
    {
      code: string;
      message: string;
    },
  ];
}

export { PromoCodeSchema, PromoCode, PromoCodeResponse, PromoCodeReject };
