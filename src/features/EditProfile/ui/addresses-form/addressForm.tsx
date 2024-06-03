import { Button, Checkbox, Divider, Form, Input, Select, Switch, Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { checkInput, checkPostalCode, checkStreet } from 'shared/lib/checkValid';
import styles from '../ProfileForm.module.css';
import { Address, FormDataAddress } from 'features/EditProfile/model/types/profileTypes';
import { COUNTRIES } from 'shared/consts';
import { formItemLayout } from 'features/RegistrationUser/ui/StyledRegistrationForm/StyledRegistrationForm';
import { PrimaryControlButton } from 'shared/ui';
import { MinusSquareOutlined } from '@ant-design/icons';
import { removeUserAddress } from 'features/EditProfile/model/services/deleteAddressProfile';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getAccessToken } from 'entities/User';
import { getProfileData } from 'features/EditProfile/model/selectors/profileSelectors';
import { useForm } from 'antd/es/form/Form';
import { updateUserAddress } from 'features/EditProfile/model/services/updateAddressProfile';
import { addNewUserAddress } from 'features/EditProfile/model/services/addNewAddressProfile';

type AddressFormProps = {
  address?: Address;
  isBilling?: boolean;
  isShipping?: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
  isEdit?: boolean;
};

const AddressForm: FC<AddressFormProps> = ({
  address,
  isBilling,
  isShipping,
  isDefaultBilling,
  isDefaultShipping,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const token = useAppSelector(getAccessToken);
  const { version, id } = useAppSelector(getProfileData);

  const [addressForm] = useForm();
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);

  const [isShippingChecked, setIsShippingChecked] = useState<boolean>(isShipping || false);
  const [isBillingChecked, setIsBillingChecked] = useState<boolean>(isBilling || false);
  const [isDefaultShippingChecked, setIsDefaultShippingChecked] = useState<boolean>(isDefaultShipping || false);
  const [isDefaultBillingChecked, setIsDefaultBillingChecked] = useState<boolean>(isDefaultBilling || false);

  useEffect(() => {
    if (isEdit) setIsEditAddress(isEdit);
  }, []);

  const handleUpdateAddres = (value: FormDataAddress) => {
    const request = {
      token,
      version,
      idUser: id,
      addressId: address?.id,
      ...value,
      shippingAddressIds: isShipping ? true : false,
      billingAddressIds: isBilling ? true : false,
    };

    dispatch(updateUserAddress(request));
  };

  const handleDeleteAddress = () => {
    const request = {
      token,
      version,
      idUser: id,
      addressId: address?.id,
    };
    dispatch(removeUserAddress(request));
  };

  const handleAddNewAddress = (value: FormDataAddress) => {
    const request = {
      token,
      version,
      idUser: id,
      ...value,
      shippingAddressIds: isShipping ? true : false,
      billingAddressIds: isBilling ? true : false,
    };
    dispatch(addNewUserAddress(request));
  };

  useEffect(() => {
    if (!isEditAddress) {
      setIsShippingChecked(!!isShipping);
      setIsBillingChecked(!!isBilling);
      setIsDefaultShippingChecked(!!isDefaultShipping);
      setIsDefaultBillingChecked(!!isDefaultBilling);
      addressForm.resetFields();
    }
  }, [isEditAddress, addressForm]);

  return (
    <Form
      initialValues={address}
      {...formItemLayout}
      className={styles.form}
      form={addressForm}
      onFinish={(value) => {
        if (address?.id) {
          handleUpdateAddres(value);
        } else {
          handleAddNewAddress(value);
        }
      }}
    >
      <div className={styles.switchContainer}>
        <Switch defaultValue={isEdit} onChange={() => setIsEditAddress(!isEditAddress)} />
        <span className={styles.editSpan}>Edit</span>
      </div>

      {isBilling && <Divider orientation="center"> Billing Address</Divider>}
      {isShipping && <Divider orientation="center"> Shipping Address</Divider>}

      <div className={styles.tagContainer}>
        {isShippingChecked && <Tag color="blue">Shipping</Tag>}
        {isBillingChecked && <Tag color="green">Billing</Tag>}
        {isDefaultShippingChecked && <Tag color="yellow">Default Shipping</Tag>}
        {isDefaultBillingChecked && <Tag color="magenta">Default Billing</Tag>}
      </div>
      <Form.Item name={'streetName'} label="Street" required rules={checkStreet()}>
        <Input disabled={!isEditAddress} />
      </Form.Item>
      <Form.Item name={'city'} label="City" required rules={checkInput('City')}>
        <Input disabled={!isEditAddress} />
      </Form.Item>
      <Form.Item name={'country'} label="Country" rules={[{ required: true, message: 'Please select Country!' }]}>
        <Select placeholder="Select your country" disabled={!isEditAddress}>
          {COUNTRIES.map(({ title, value }) => (
            <Option key={value} value={value}>
              {title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={'postalCode'}
        label="Postal code"
        required
        dependencies={['country']}
        rules={checkPostalCode('country')}
      >
        <Input disabled={!isEditAddress} />
      </Form.Item>

      {isEditAddress && (
        <div className={styles.checkboxWrapper}>
          {isShipping && (
            <Form.Item name={'defaultShippingAddressId'} valuePropName="checked" initialValue={isDefaultShipping}>
              <Checkbox
                disabled={!isEditAddress}
                checked={isDefaultShipping}
                onChange={(e) => setIsDefaultShippingChecked(e.target.checked)}
              >
                Set as a default shipping address
              </Checkbox>
            </Form.Item>
          )}

          {isBilling && (
            <Form.Item name={'defaultBillingAddressId'} valuePropName="checked" initialValue={isDefaultBillingChecked}>
              <Checkbox
                disabled={!isEditAddress}
                checked={isDefaultBillingChecked}
                onChange={(e) => setIsDefaultBillingChecked(e.target.checked)}
              >
                Set as a default billing address
              </Checkbox>
            </Form.Item>
          )}
        </div>
      )}

      {isEditAddress && (
        <div className={styles.saveBtnContainer}>
          <Button
            type="primary"
            danger
            ghost
            icon={<MinusSquareOutlined />}
            disabled={!isEditAddress}
            className={styles.deleteAddressBtn}
            onClick={handleDeleteAddress}
          >
            Delete address
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
      )}
    </Form>
  );
};

export default AddressForm;
