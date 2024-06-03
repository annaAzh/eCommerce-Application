import { Button, DatePicker, Divider, Flex, Form, Input, Switch } from 'antd';
import styles from './ProfileForm.module.css';
import { formItemLayout } from 'features/RegistrationUser/ui/StyledRegistrationForm/StyledRegistrationForm';

import { checkBirthday, checkConfirmPassword, checkEmail, checkInput, checkPassword } from 'shared/lib/checkValid';
import { FC, useEffect, useMemo, useState } from 'react';
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
import { PlusSquareOutlined } from '@ant-design/icons';
import AddressForm from './addresses-form/addressForm';

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const isLogined = useAppSelector(getUserIsLoginedStatus);
  const profileData = useAppSelector(getProfileData);
  const isLoading = useAppSelector(getProfileDataIsLoading);
  const profileError = useAppSelector(getProfileError);
  const updatedStatus = useAppSelector(getUpdatedStatus);
  const { addresses, billingAddressIds, shippingAddressIds, defaultBillingAddressId, defaultShippingAddressId } =
    useAppSelector(getProfileData);

  const [profileForm] = Form.useForm();
  const navigate = useNavigate();

  const [addNewBillingAddresForm, setAddNewBillingAddresForm] = useState<boolean>(false);
  const [addNewShippingAddresForm, setAddNewShippingAddresForm] = useState<boolean>(false);
  const [isEditDetails, setIsEditDetails] = useState<boolean>(false);
  const [tokenAccess, setTokenAccess] = useState<string | ''>('');

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
    setAddNewBillingAddresForm(false);
    setAddNewShippingAddresForm(false);
  }, [updatedStatus]);

  useEffect(() => {
    if (!token) return;
    if (!isLogined) return;
    setTokenAccess(token);
    dispatch(getUserProfile(token));
  }, [isLogined, token]);

  useEffect(() => {
    if (profileData && isLogined) {
      if (isEditDetails) return;

      profileForm.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        dateOfBirth: dayjs(profileData.dateOfBirth),
      });
    }
  }, [profileData, isLogined, isEditDetails]);

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

  const memoComponent = useMemo(() => {
    if (addresses?.length === 0) return;
    return (
      <>
        {addresses?.map((address, i) => {
          return (
            <AddressForm
              address={address}
              key={i}
              isBilling={address.id && billingAddressIds?.includes(address.id) ? true : false}
              isShipping={address.id && shippingAddressIds?.includes(address.id) ? true : false}
              isDefaultBilling={address.id === defaultBillingAddressId}
              isDefaultShipping={address.id === defaultShippingAddressId}
            />
          );
        })}
      </>
    );
  }, [addresses]);

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
                token: tokenAccess,
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
                token: tokenAccess,
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

          {memoComponent}

          {addNewBillingAddresForm && <AddressForm isBilling={true} isEdit={true} />}
          {addNewShippingAddresForm && <AddressForm isShipping={true} isEdit={true} />}

          <div className={styles.addBtnContainer}>
            <Button
              type="primary"
              ghost
              icon={<PlusSquareOutlined />}
              className={styles.addAddressBtn}
              onClick={() => setAddNewBillingAddresForm(!addNewBillingAddresForm)}
            >
              {!addNewBillingAddresForm && 'Add billing address'}
              {addNewBillingAddresForm && 'Remove new billing address'}
            </Button>
          </div>

          <div className={styles.addBtnContainer}>
            <Button
              type="primary"
              ghost
              icon={<PlusSquareOutlined />}
              className={styles.addAddressBtn}
              onClick={() => setAddNewShippingAddresForm(!addNewShippingAddresForm)}
            >
              {' '}
              {!addNewShippingAddresForm && 'Add shipping address'}
              {addNewShippingAddresForm && 'Remove new shipping address'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { ProfileForm };
