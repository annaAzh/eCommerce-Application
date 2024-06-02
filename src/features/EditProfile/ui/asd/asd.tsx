import { Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import { Address } from 'features/EditProfile/model/types/profileTypes';
import { FC } from 'react';
import { COUNTRIES } from 'shared/consts';
import { checkInput, checkPostalCode, checkStreet } from 'shared/lib/checkValid';

interface Props {
  adress?: Address;
}

export const Abs: FC<Props> = ({ adress }) => {
  const { Option } = Select;

  return (
    <div style={{ border: 'solid 1px black', padding: '1%', margin: '20px' }}>
      <Form initialValues={adress}>
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
      </Form>
    </div>
  );
};
