import styles from './ProfileForm.module.css';
import { FC, useEffect, useMemo } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { HashLoader } from 'react-spinners';
import { getProfileData, getProfileDataIsLoading } from '../model/selectors/profileSelectors';
import { Abs } from './asd/asd';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks';
import { getUserProfile } from '../model/services/getUserProfile';

const ProfileForm: FC = () => {
  const isLoading = useAppSelector(getProfileDataIsLoading);
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { addresses } = useAppSelector(getProfileData);

  useEffect(() => {
    if (!token) return;
    dispatch(getUserProfile(token));
  }, [token]);

  console.log(addresses);

  const memoComponent = useMemo(() => {
    if (addresses?.length === 0) return;

    return <>{addresses?.map((adress, index) => <Abs key={index} adress={adress} />)}</>;
  }, [addresses]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <h2 className={styles.title}>Profile</h2>
          {memoComponent}
          <Abs />
          {/* return (
          <div key={key}>
            <div className={styles.tagContainer}>
              {checkShippingAddress(addressId) && <Tag color="blue">Shipping</Tag>}
              {checkBillingAddress(addressId) && <Tag color="green">Billing</Tag>}
              {checkdefaultShippingAddress(addressId) && <Tag color="yellow">Default Shipping</Tag>}
              {checkdefaultBillingAddress(addressId) && <Tag color="magenta">Default Billing</Tag>}
            </div>

            <Form.Item name={[name, 'streetName']} label="Street" required rules={checkStreet()}>
              <Input disabled={!isEditAddress} />
            </Form.Item>
            <Form.Item name={[name, 'city']} label="City" required rules={checkInput('City')}>
              <Input disabled={!isEditAddress} />
            </Form.Item>
            <Form.Item
              name={[name, 'country']}
              label="Country"
              rules={[{ required: true, message: 'Please select Country!' }]}
            >
              <Select placeholder="Select your country" disabled={!isEditAddress}>
                {COUNTRIES.map(({ title, value }) => (
                  <Option key={value} value={value}>
                    {title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={[name, 'postalCode']}
              label="Postal code"
              required
              dependencies={[[name, 'country']]}
              // rules={checkPostalCode('country')}
              rules={[
                {
                  validator: (_, value: string) => {
                    const countryCode: string = addressForm.getFieldsValue().addresses[name].country;
                    const country = COUNTRIES.find((elem) => elem.value === countryCode);

                    if (!value) {
                      return Promise.reject('Postal code must not be empty');
                    } else if (!countryCode) {
                      return Promise.reject('Please, choose country before');
                    } else if (postalCodes.validate(countryCode, value) !== true) {
                      return Promise.reject(`Invalid postal code format for ${country?.title}!`);
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input disabled={!isEditAddress} />
            </Form.Item>
            {isEditAddress && (
              <div className={styles.checkboxWrapper}>
                <Form.Item
                  name={[name, 'billingAddressIds']}
                  valuePropName="checked"
                  initialValue={checkBillingAddress(addressId)}
                >
                  <Checkbox
                    disabled={!isEditAddress}
                    checked={checkBillingAddress(addressId)}
                    onChange={(e) => handleAddressCheckboxChange(addressId, e.target.checked, 'billing')}
                  >
                    Set as billing address
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name={[name, 'shippingAddressIds']}
                  valuePropName="checked"
                  initialValue={checkShippingAddress(addressId)}
                >
                  <Checkbox
                    disabled={!isEditAddress}
                    checked={checkShippingAddress(addressId)}
                    onChange={(e) => handleAddressCheckboxChange(addressId, e.target.checked, 'shipping')}
                  >
                    Set as shipping address
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name={[name, 'defaultShippingAddressId']}
                  valuePropName="checked"
                  initialValue={checkdefaultShippingAddress(addressId)}
                >
                  <Checkbox
                    disabled={!isEditAddress}
                    checked={data.defaultShippingAddress === addressId}
                    onChange={(e) => handleCheckboxChange(addressId, e.target.checked, 'shipping')}
                  >
                    Set as a default shipping address
                  </Checkbox>
                </Form.Item>

                <Form.Item
                  name={[name, 'defaultBillingAddressId']}
                  valuePropName="checked"
                  initialValue={checkdefaultBillingAddress(addressId)}
                >
                  <Checkbox
                    disabled={!isEditAddress}
                    checked={data.defaultBillingAddress === addressId}
                    onChange={(e) => handleCheckboxChange(addressId, e.target.checked, 'billing')}
                  >
                    Set as a default billing address
                  </Checkbox>
                </Form.Item>
              </div>
            )}

            {isEditAddress && (
              <div className={styles.saveBtnContainer}>
                <Button
                  type="primary"
                  danger
                  ghost
                  icon={<MinusSquareOutlined />}
                  className={styles.deleteAddressBtn}
                  disabled={!isEditAddress}
                  onClick={() => {
                    if (addressForm.getFieldsValue().addresses[name].id) {
                      const addressIdParams = addressForm.getFieldsValue().addresses[name].id;
                      handleDeleteAddress(addressIdParams);
                    }
                  }}
                >
                  Delete address
                </Button>
                <PrimaryControlButton
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={!isEditAddress}
                  // onClick={() => {
                  //   if (addressForm.getFieldsValue().addresses[name].id) {
                  //     const value = {
                  //       addressId: addressForm.getFieldsValue().addresses[name].id,
                  //       country: addressForm.getFieldsValue().addresses[name].country,
                  //       streetName: addressForm.getFieldsValue().addresses[name].streetName,
                  //       city: addressForm.getFieldsValue().addresses[name].city,
                  //       postalCode: addressForm.getFieldsValue().addresses[name].postalCode,
                  //       defaultShippingAddressId:
                  //         addressForm.getFieldsValue().addresses[name].defaultShippingAddressId,
                  //       defaultBillingAddressId:
                  //         addressForm.getFieldsValue().addresses[name].defaultBillingAddressId,
                  //       billingAddressIds: addressForm.getFieldsValue().addresses[name].billingAddressIds,
                  //       shippingAddressIds: addressForm.getFieldsValue().addresses[name].shippingAddressIds,
                  //     };

                  //     handleUpdateAddress(value);
                  //   } else {
                  //     const value = {
                  //       country: addressForm.getFieldsValue().addresses[name].country,
                  //       streetName: addressForm.getFieldsValue().addresses[name].streetName,
                  //       city: addressForm.getFieldsValue().addresses[name].city,
                  //       postalCode: addressForm.getFieldsValue().addresses[name].postalCode,
                  //       defaultShippingAddressId:
                  //         addressForm.getFieldsValue().addresses[name].defaultShippingAddressId,
                  //       defaultBillingAddressId:
                  //         addressForm.getFieldsValue().addresses[name].defaultBillingAddressId,
                  //       billingAddressIds: addressForm.getFieldsValue().addresses[name].billingAddressIds,
                  //       shippingAddressIds: addressForm.getFieldsValue().addresses[name].shippingAddressIds,
                  //     };

                  //     handleAddNewAddress(value);
                  //   }
                  // }}
                >
                  Save changes
                </PrimaryControlButton>
              </div>
            )}

            <Divider className={styles.decorativeDivider}></Divider>
          </div>
          ); */}
        </>
      )}
    </div>
  );
};

export { ProfileForm };
