import { Button, Checkbox, DatePicker, Divider, Flex, Form, Input, Select, Switch, Tag } from 'antd';
import styles from './ProfileForm.module.css';
import { formItemLayout } from 'features/RegistrationUser/ui/StyledRegistrationForm/StyledRegistrationForm';
import postalCodes from 'postal-codes-js';

import {
  checkBirthday,
  checkConfirmPassword,
  checkEmail,
  checkInput,
  checkPassword,
  checkStreet,
} from 'shared/lib/checkValid';
import { COUNTRIES } from 'shared/consts';
import { FC, useEffect, useState } from 'react';
import { getAccessToken, getUserIsLoginedStatus, passwordFlow } from 'entities/User';
import dayjs from 'dayjs';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HashLoader } from 'react-spinners';
import { setNotificationMessage } from 'entities/NotificationTool';
import { getUserProfile } from '../model/services/getUserProfile';
import {
  getProfileData,
  getProfileDataIsLoading,
  getProfileError,
  getUpdatedStatus,
} from '../model/selectors/profileSelectors';
import { clearProfileError, clearProfileUpdated } from '../model/slices/profileSlice';
import { PrimaryControlButton } from 'shared/ui';
import { updateUserDetails } from '../model/services/updateDetailsProfile';
import {
  FormDataPassword,
  FormDataProfile,
  UpdateDetailsParams,
  UpdatePasswordParams,
} from '../model/types/profileTypes';
import { updateUserPassword } from '../model/services/updatePasswordProfile';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'shared/types';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const isLogined = useAppSelector(getUserIsLoginedStatus);
  const profileData = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileDataIsLoading);
  const profileError = useAppSelector(getProfileError);
  const updatedStatus = useAppSelector(getUpdatedStatus);

  const [profileForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  const { Option } = Select;
  const [isEditDetails, setIsEditDetails] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    defaultBillingAddress: '',
    defaultShippingAddress: '',
    billingAddressIds: [''],
    shippingAddressIds: [''],
  });

  useEffect(() => {
    if (!token || isLogined) return;
    navigate('/' + Paths.login);
  }, [token]);

  useEffect(() => {
    if (!updatedStatus) return;
    dispatch(
      setNotificationMessage({
        message: 'Success!',
        description: 'Your information has been updated',
      }),
    );
    dispatch(clearProfileUpdated());
    setIsEditDetails(false);
  }, [updatedStatus]);

  useEffect(() => {
    if (!token) return;
    if (!isLogined) return;
    dispatch(getUserProfile(token));
  }, [isLogined, token]);

  useEffect(() => {
    if (profileData && isLogined) {
      profileForm.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        dateOfBirth: dayjs(profileData.dateOfBirth),
      });
      addressForm.setFieldsValue({
        addresses: profileData.addresses || [],
      });

      setData({
        defaultBillingAddress: profileData.defaultBillingAddressId || '',
        defaultShippingAddress: profileData.defaultShippingAddressId || '',
        billingAddressIds: profileData.billingAddressIds || [],
        shippingAddressIds: profileData.shippingAddressIds || [],
      });
    }
  }, [profileData, addressForm, profileForm, isLogined, isEditDetails]);

  useEffect(() => {
    if (!profileError) return;
    dispatch(
      setNotificationMessage({
        message: profileError,
        type: 'error',
      }),
    );
    dispatch(clearProfileError());
    setIsEditDetails(false);
  }, [profileError]);

  const checkShippingAddress = (addressId: string) => {
    return data.shippingAddressIds.includes(addressId);
  };

  const checkBillingAddress = (addressId: string) => {
    return data.billingAddressIds.includes(addressId);
  };

  const checkdefaultShippingAddress = (addressId: string) => {
    return data.defaultShippingAddress === addressId;
  };

  const checkdefaultBillingAddress = (addressId: string) => {
    return data.defaultBillingAddress === addressId;
  };

  const handleCheckboxChange = (addressId: string, checked: boolean, type: 'shipping' | 'billing') => {
    setData((prevData) => ({
      ...prevData,
      defaultShippingAddress: type === 'shipping' ? (checked ? addressId : '') : data.defaultShippingAddress,
      defaultBillingAddress: type === 'billing' ? (checked ? addressId : '') : data.defaultBillingAddress,
    }));
  };

  const handleAddressCheckboxChange = (addressId: string, checked: boolean, type: 'shipping' | 'billing') => {
    setData((prevData) => ({
      ...prevData,
      shippingAddressIds:
        type === 'shipping'
          ? checked
            ? [...data.shippingAddressIds, addressId]
            : data.shippingAddressIds.filter((id) => id !== addressId)
          : data.shippingAddressIds,
      billingAddressIds:
        type === 'billing'
          ? checked
            ? [...data.billingAddressIds, addressId]
            : data.billingAddressIds.filter((id) => id !== addressId)
          : data.billingAddressIds,
    }));
  };

  const handleAddAddress = () => {
    const addresses = addressForm.getFieldValue('addresses') || [];
    const newAddress = { streetName: '', city: '', country: '', postalCode: '' };
    addressForm.setFieldsValue({ addresses: [...addresses, newAddress] });
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <h2 className={styles.title}>Profile</h2>

          <Form
            {...formItemLayout}
            form={profileForm}
            name="profile-details"
            className={styles.form}
            onFinish={(values: FormDataProfile) => {
              const { id, version } = profileData;
              const requestData: UpdateDetailsParams = {
                ...values,
                dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
                id,
                version,
                token,
              };
              dispatch(updateUserDetails(requestData));
            }}
          >
            <div className={styles.switchContainer}>
              <Switch onChange={() => setIsEditDetails(!isEditDetails)} />
              <span className={styles.editSpan}>Edit</span>
            </div>
            <Divider orientation="center">Account Details</Divider>
            <Form.Item name="firstName" label="First name" required rules={checkInput('First name')}>
              <Input disabled={!isEditDetails} />
            </Form.Item>
            <Form.Item name="lastName" label="Last name" required rules={checkInput('Last name')}>
              <Input disabled={!isEditDetails} />
            </Form.Item>
            <Form.Item name="email" label="E-mail" required rules={checkEmail()}>
              <Input disabled={!isEditDetails} />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth" required rules={checkBirthday()}>
              <DatePicker format="YYYY-MM-DD" disabled={!isEditDetails} />
            </Form.Item>
            <div className={styles.saveBtnContainer}>
              <PrimaryControlButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!isEditDetails}
              >
                Save changes
              </PrimaryControlButton>
            </div>
          </Form>

          <Form
            {...formItemLayout}
            name="profile-password"
            className={styles.form}
            onFinish={(values: FormDataPassword) => {
              const { id, version } = profileData;
              const requestData: UpdatePasswordParams = {
                ...values,
                id,
                version,
                token,
              };
              dispatch(updateUserPassword(requestData)).then(() => {
                if (profileData.email) {
                  dispatch(passwordFlow({ username: profileData.email, password: requestData.newPassword }));
                }
              });
            }}
          >
            <Divider orientation="center"> Change password</Divider>
            <Form.Item name="currentPassword" label="Old password" rules={checkPassword()}>
              <Input.Password autoComplete="on" />
            </Form.Item>
            <Form.Item name="newPassword" label="New password" rules={checkPassword()}>
              <Input.Password autoComplete="on" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm new password"
              dependencies={['newPassword']}
              rules={checkConfirmPassword('newPassword')}
            >
              <Input.Password autoComplete="on" />
            </Form.Item>
            <Flex className={styles.passwordBtnContainer}>
              <Button type="primary" htmlType="reset" danger ghost>
                Cancel
              </Button>
              <div className={styles.saveBtnContainer}>
                <PrimaryControlButton type="primary" htmlType="submit" className="login-form-button">
                  Save changes
                </PrimaryControlButton>
              </div>
            </Flex>
          </Form>

          <Form
            {...formItemLayout}
            form={addressForm}
            name="profile-address"
            className={styles.form}
            onFinish={(values) => {
              console.log('Form values:', values);
            }}
          >
            <div className={styles.switchContainer}>
              <Switch onChange={() => setIsEditAddress(!isEditAddress)} />
              <span className={styles.editSpan}>Edit</span>
            </div>
            <Divider orientation="center">Addresses</Divider>
            <Form.List name="addresses">
              {(fields, { remove }) => (
                <>
                  {fields.map(({ key, name }) => {
                    const addressId: string = addressForm.getFieldValue(['addresses', name, 'id']);

                    return (
                      <div key={key}>
                        <Flex gap="4px 0" wrap className={styles.tagContainer}>
                          {data ? checkShippingAddress(addressId) && <Tag color="blue">Shipping</Tag> : ''}
                          {data ? checkBillingAddress(addressId) && <Tag color="green">Billing</Tag> : ''}
                          {data
                            ? checkdefaultShippingAddress(addressId) && <Tag color="yellow">Default Shipping</Tag>
                            : ''}
                          {data
                            ? checkdefaultBillingAddress(addressId) && <Tag color="magenta">Default Billing</Tag>
                            : ''}
                        </Flex>

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
                        <div className={styles.checkboxWrapper}>
                          <Form.Item
                            name={[name, 'setAsBillingAddress']}
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
                            name={[name, 'setAsShippingAddress']}
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
                            name={[name, 'defaultShippingAddress']}
                            valuePropName="checked"
                            initialValue={checkdefaultShippingAddress(addressId)}
                          >
                            <Checkbox
                              disabled={
                                !isEditAddress ||
                                (data.defaultShippingAddress !== addressId && data.defaultShippingAddress !== '')
                              }
                              checked={data.defaultShippingAddress === addressId}
                              onChange={(e) => handleCheckboxChange(addressId, e.target.checked, 'shipping')}
                            >
                              Set as a default shipping address
                            </Checkbox>
                          </Form.Item>

                          <Form.Item
                            name={[name, 'defaultBillingAddress']}
                            valuePropName="checked"
                            initialValue={checkdefaultBillingAddress(addressId)}
                          >
                            <Checkbox
                              disabled={
                                !isEditAddress ||
                                (data.defaultBillingAddress !== addressId && data.defaultBillingAddress !== '')
                              }
                              checked={data.defaultBillingAddress === addressId}
                              onChange={(e) => handleCheckboxChange(addressId, e.target.checked, 'billing')}
                            >
                              Set as a default billing address
                            </Checkbox>
                          </Form.Item>
                        </div>

                        <Button
                          type="primary"
                          danger
                          ghost
                          icon={<MinusSquareOutlined />}
                          className={styles.deleteAddressBtn}
                          disabled={!isEditAddress}
                          onClick={() => remove(name)}
                        >
                          Delete address
                        </Button>
                      </div>
                    );
                  })}
                </>
              )}
            </Form.List>
            <div className={styles.saveBtnContainer}>
              <Button
                type="primary"
                ghost
                icon={<PlusSquareOutlined />}
                className={styles.addAddressBtn}
                disabled={!isEditAddress}
                onClick={handleAddAddress}
              >
                Add address
              </Button>

              <PrimaryControlButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!isEditAddress}
              >
                Save changes
              </PrimaryControlButton>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export { ProfileForm };
