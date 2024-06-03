import { Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import { getAccessToken } from 'entities/User';
import { getProfileData } from 'features/EditProfile/model/selectors/profileSelectors';
import { Address, UpdateAddressParams } from 'features/EditProfile/model/types/profileTypes';
import { FC } from 'react';
import { COUNTRIES } from 'shared/consts';
import { checkInput, checkPostalCode, checkStreet } from 'shared/lib/checkValid';
import { useAppSelector } from 'shared/lib/hooks';
import { PrimaryControlButton } from 'shared/ui';

interface Props {
  adress?: Address;

  handler: (data: UpdateAddressParams) => void;
}

export const Abs: FC<Props> = ({ adress, handler }) => {
  const { Option } = Select;
  const token = useAppSelector(getAccessToken);
  const { version, id } = useAppSelector(getProfileData);

  const aHandler = (data: UpdateAddressParams) => {
    const request: UpdateAddressParams = {
      token,
      version,
      idUser: id,
      ...data,
      id: adress?.id,
    };
    handler(request);
  };

  return (
    <div style={{ border: 'solid 1px black', padding: '1%', margin: '20px' }}>
      <Form initialValues={adress} onFinish={aHandler}>
        <Form.Item name={'streetName'} label="Street" required rules={checkStreet()}>
          <Input />
        </Form.Item>
        <Form.Item name={'city'} label="City" required rules={checkInput('City')}>
          <Input />
        </Form.Item>
        <Form.Item name={'country'} label="Country" rules={[{ required: true, message: 'Please select Country!' }]}>
          <Select placeholder="Select your country">
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
          <Input />
        </Form.Item>
        <PrimaryControlButton type="primary" htmlType="submit" className="login-form-button">
          change
        </PrimaryControlButton>
      </Form>
    </div>
  );
};
