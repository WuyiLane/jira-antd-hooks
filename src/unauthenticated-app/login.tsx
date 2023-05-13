import React, { FormEvent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import { LongButton } from './index';
import { useAsync } from '../utils/use-async';

// 普通类型

interface Advance {
  id: number;
}

interface Base extends Advance {
  name: string;
}

const test = (p: Base) => {};
const a = { id: 1, name: 'louis' };
test(a);

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const [form] = Form.useForm();
  const [param, setParam] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const { login, user } = useAuth();
  const { run, isLoading, error } = useAsync(undefined, { throwOnError: true });
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // HTMLFormElement extends Element 更高级的类型
  // FormEvent<HTMLFormElement>
  //  {username:string,Password:string,remember:boolean}
  const apiUrl = process.env.REACT_APP_API_URL;
  // const onFinhandleSubmit = (values: { username: string; password: string; remember: boolean }) => {
  //     console.log(values, 'values');
  //     const {username, password} = values;
  //     const obj = {username, password};
  //     console.log(obj, 'obj');
  //
  //     fetch(`${apiUrl}/login`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(obj),
  //     }).then(async res => {
  //         if (res.ok) {
  //         }
  //     });
  // };
  const onFinishFailed = (errorInfo: {
    values: object;
    errorFields: object[];
    outOfDate: boolean;
  }) => {
    console.log('Failed:', errorInfo);
  };
  const loginin = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then(async res => {
      if (res.ok) {
      }
    });
  };
  // FormEvent<HTMLFormElement>
  const onFinhandleSubmit = async (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    // event.preventDefault()
    // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
    console.log('走了吗？', user);
  };
  return (
    <Form onFinish={onFinhandleSubmit}>
      {user ? (
        <div>
          登录成功,用户:{user?.name}
          {user.token}
        </div>
      ) : null}
      {/* 纯异步*/}
      {error ? error.message : null}
      <Form.Item
        name={'username'}
        rules={[
          {
            required: true,
            message: '请输入账号',
          },
        ]}
      >
        <Input type='text' placeholder={'用户名'} id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[
          {
            required: true,
            message: '请输入账号',
          },
        ]}
      >
        <Input type='text' placeholder={'密码'} id={'password'} />
      </Form.Item>
      <LongButton type={'primary'} htmlType={'submit'} loading={isLoading}>
        登录
      </LongButton>
    </Form>
  );
  //   (
  // <Form
  //   {...layout}
  //   form={form}
  //   name='control-hooks'
  //   initialValues={{ remember: true }}
  //   onFinish={onFinish}
  //   onFinishFailed={onFinishFailed}
  //   autoComplete='off'
  //   style={{ maxWidth: 600, padding: 20 }}
  // >
  //   {user ? <div> 登录成功,用户名:{user?.name}</div> : null}

  //   <Form.Item
  //     name='username'
  //     label='用户名'
  //     rules={[{ required: true, message: 'Please input your username!' }]}
  //   >
  //     <Input />
  //   </Form.Item>
  //   <Form.Item
  //     label='password'
  //     name='password'
  //     rules={[{ required: true, message: 'Please input your password!' }]}
  //   >
  //     <Input.Password />
  //   </Form.Item>
  //   {/*是否记住用户名*/}
  //   <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
  //     <Checkbox>记住用户名</Checkbox>
  //   </Form.Item>
  //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //     <Button type='primary' htmlType='submit'>
  //       登录
  //     </Button>
  //   </Form.Item>
  // </Form>
  //   );
};
