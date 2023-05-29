/**
 * 创建任务组
 */
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAddEpic } from '../../utils/epic-epic';
import { useEpicsQueryKey } from './util';
import { useForm } from 'antd/es/form/Form';
import { useProjectIdInUrl } from '../kanban/util';

/***
 * 从外面透传的props
 * @param props
 * @constructor
 */
export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  // 创建按钮
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };
  /**
   * 当form,visible  改变的时候要做设么?
   */
  useEffect(() => {
    // 重置
    form.resetFields();
  }, [form, props.visible]);
  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>创建任务组</h1>
            {/*<ErrorBox error={error}/>*/}
            <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入任务组名' }]}
              >
                <Input placeholder={'请输入任务组名称'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={isLoading} type={'primary'} htmlType={'submit'}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
