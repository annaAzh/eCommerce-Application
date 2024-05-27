import { Checkbox, DatePicker, Divider, Flex, Form, Input, Select, Tag } from 'antd';
import styles from './ProfileForm.module.css';
import { formItemLayout } from 'features/RegistrationUser/ui/StyledRegistrationForm/StyledRegistrationForm';

import { checkBirthday, checkEmail, checkInput, checkPostalCode, checkStreet } from 'shared/lib/checkValid';
import { COUNTRIES } from 'shared/consts';
import { FC, useEffect, useState } from 'react';
import { getAccessToken, getUserIsLoginedStatus } from 'entities/User';
import dayjs from 'dayjs';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HashLoader } from 'react-spinners';
import { setNotificationMessage } from 'entities/NotificationTool';
import { getUserProfile } from '../model/services/getUserProfile';
import { getProfileData, getProfileDataIsLoading, getProfileError } from '../model/selectors/profileSelectors';
import { Address } from '../model/types/profileTypes';
import { clearProfileError } from '../model/slices/profileSlice';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const isLogined = useAppSelector(getUserIsLoginedStatus);
  const profileData = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileDataIsLoading);
  const profileError = useAppSelector(getProfileError);

  const [form] = Form.useForm();
  const { Option } = Select;
  const [addresses, setAddresses] = useState<Address[] | []>([]);
  const [data, setData] = useState({
    defaultBillingAddress: '',
    defaultShippingAddress: '',
    billingAddressIds: [''],
    shippingAddressIds: [''],
  });

  useEffect(() => {
    if (!token) return;
    dispatch(getUserProfile(token));
  }, [isLogined, token]);

  useEffect(() => {
    if (profileData && isLogined) {
      form.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        dateOfBirth: dayjs(profileData.dateOfBirth),
        addresses: profileData.addresses || [],
      });
      setAddresses(profileData.addresses || []);
      setData({
        defaultBillingAddress: profileData.defaultBillingAddressId || '',
        defaultShippingAddress: profileData.defaultShippingAddressId || '',
        billingAddressIds: profileData.billingAddressIds || [],
        shippingAddressIds: profileData.shippingAddressIds || [],
      });
    }
  }, [profileData, form, isLogined]);

  useEffect(() => {
    if (!profileError) return;
    dispatch(
      setNotificationMessage({
        message: profileError,
        type: 'error',
      }),
    );
    dispatch(clearProfileError());
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

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <h2 className={styles.title}>Profile</h2>

          <Form {...formItemLayout} form={form} name="profile-details" className={styles.form}>
            <Divider orientation="center">Account Details</Divider>
            <Form.Item name="firstName" label="First name" required rules={checkInput('First name')}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="lastName" label="Last name" required rules={checkInput('Last name')}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="email" label="E-mail" required rules={checkEmail()}>
              <Input disabled />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth" required rules={checkBirthday()}>
              <DatePicker format="YYYY-MM-DD" disabled />
            </Form.Item>
          </Form>

          <Form
            {...formItemLayout}
            form={form}
            name="profile-address"
            className={styles.form}
            initialValues={{ addresses }}
          >
            <Divider orientation="center">Addresses</Divider>
            <Form.List name="addresses">
              {(fields) => (
                <>
                  {fields.map(({ key, name }) => {
                    const addressId = form.getFieldValue(['addresses', name, 'id']);

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
                          <Input disabled />
                        </Form.Item>
                        <Form.Item name={[name, 'city']} label="City" required rules={checkInput('City')}>
                          <Input disabled />
                        </Form.Item>
                        <Form.Item
                          name={[name, 'country']}
                          label="Country"
                          rules={[{ required: true, message: 'Please select Country!' }]}
                        >
                          <Select placeholder="Select your country" disabled>
                            {COUNTRIES.map(({ title, value }) => (
                              <Option key={title} value={value}>
                                {title}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={[name, 'postalCode']}
                          label="Postal code"
                          required
                          dependencies={['country']}
                          rules={checkPostalCode('country')}
                        >
                          <Input disabled />
                        </Form.Item>
                        <div className={styles.checkboxWrapper}>
                          <Checkbox disabled checked={checkShippingAddress(addressId)}>
                            Set as shipping address
                          </Checkbox>
                          <Checkbox disabled checked={checkBillingAddress(addressId)}>
                            Set as billing address
                          </Checkbox>

                          <Checkbox disabled checked={checkdefaultShippingAddress(addressId)}>
                            Set as a default shipping address
                          </Checkbox>
                          <Checkbox disabled checked={checkdefaultBillingAddress(addressId)}>
                            Set as a default billing address
                          </Checkbox>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </Form.List>
          </Form>
        </>
      )}
    </div>
  );
};

export { ProfileForm };
