import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegistrationReject } from 'features/RegistrationUser/model/types/registrationTypes';
import { AddNewAddressParams, ErrorWithResponse, ProfileData } from '../types/profileTypes';

const API_URL = process.env.API_URL;
const PROJECT_KEY = process.env.PROJECT_KEY;

export const addNewUserAddress = createAsyncThunk(
  'profile/addNewAddress',
  async (params: AddNewAddressParams, thunkAPI) => {
    try {
      const { token, version, idUser } = params;
      const addressId: string = Math.random().toString();

      const body = {
        version,

        actions: [
          {
            action: 'addAddress',
            address: {
              addressId,
              country: params.country,
              postalCode: params.postalCode,
              city: params.city,
              streetName: params.streetName,
            },
          },
        ].filter((action) => action !== null),
      };

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      const res = await axios.post(`${API_URL}${PROJECT_KEY}/customers/${idUser}`, body, { headers });
      const success: ProfileData = res.data;
      const { addresses } = success;
      if (addresses) {
        const lastAddressId = addresses[addresses.length - 1].id;
        const { version: profileVersion } = success;
        const bodyBillingShipping = {
          version: profileVersion,

          actions: [
            params.billingAddressIds
              ? {
                  action: 'addBillingAddressId',
                  addressId: lastAddressId,
                }
              : null,

            params.shippingAddressIds
              ? {
                  action: 'addShippingAddressId',
                  addressId: lastAddressId,
                }
              : null,
          ].filter((action) => action !== null),
        };
        const resSetAddresses = await axios.post(`${API_URL}${PROJECT_KEY}/customers/${idUser}`, bodyBillingShipping, {
          headers,
        });
        const lastUpdate: ProfileData = resSetAddresses.data;

        if (lastUpdate.addresses) {
          const lastAddressIdDefault = addresses[addresses.length - 1].id;
          const { version: defaultVersion } = lastUpdate;
          const bodyDefaultUpdate = {
            version: defaultVersion,

            actions: [
              params.defaultShippingAddressId
                ? {
                    action: 'setDefaultShippingAddress',
                    addressId: lastAddressIdDefault,
                  }
                : null,

              params.defaultBillingAddressId
                ? {
                    action: 'setDefaultBillingAddress',
                    addressId: lastAddressIdDefault,
                  }
                : null,
            ].filter((action) => action !== null),
          };
          const ressetAddresses = await axios.post(`${API_URL}${PROJECT_KEY}/customers/${idUser}`, bodyDefaultUpdate, {
            headers,
          });
          const result: ProfileData = ressetAddresses.data;
          return result;
        }
      }
      return success;
    } catch (error) {
      let defaultMessage = 'Something went wrong';

      if (error instanceof Error) {
        const reject: ErrorWithResponse = error as ErrorWithResponse;
        if (reject.response && reject.response.data) {
          const errorResponse: RegistrationReject = reject.response.data as unknown as RegistrationReject;

          if (errorResponse.statusCode === 401) {
            errorResponse.message = 'Having problems accessing the server';
          } else if (errorResponse.statusCode === 400) {
            errorResponse.message = 'Bad Request: something wrong with data';
          } else if (errorResponse.statusCode === 403) {
            errorResponse.message = 'Forbidden: You do not have permission to access this resource.';
          }

          defaultMessage = errorResponse.message || defaultMessage;
        }
      }

      return thunkAPI.rejectWithValue(defaultMessage);
    }
  },
);
