//  model

import { Button, Drawer, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useProjectModal } from 'screens/project-list/util';
import { UserSelect } from '../../component/user-select';
import { useAddProject, useEditProject } from '../../utils/project';
import { useForm } from 'antd/es/form/Form';
import { ErrorBox } from '../../component/lib';
import styled from '@emotion/styled';

/***
 * 解决 hookszhg
 * @constructor
 */

export const ProjectModal = () => {
  const { ProjectModalOpen, close, editingProject, isLoading } = useProjectModal();
  // 编辑与创建
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  // 读取 总的状态树的状态
  // const projectModalOpen = useSelector(selectProjectModalOpen)
  /***
   * hooks 要想使用要在最顶层使用
   *  区分 isLoading mutateLoading
   */
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const title = editingProject ? '编辑项目' : '创建项目';
  const onFinish = (values: any) => {
    // 异步获取
    mutateAsync({ ...editingProject, ...values }).then(() => {
      // 重置表单
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer forceRender={true} onClose={close} width={'100%'} visible={ProjectModalOpen}>
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>{title}</h1>
            {/*<ErrorBox error={error}/>*/}
            <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder={'请输入项目名称'} />
              </Form.Item>
              <Form.Item
                label={'部门'}
                name={'organization'}
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder={'请输入部门名'} />
              </Form.Item>
              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>
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
