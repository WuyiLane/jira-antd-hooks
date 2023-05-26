import { useForm } from 'antd/es/form/Form';
import { useTasksModal, useTasksQueryKey } from './util';
import { useEditTask } from '../../utils/task';
import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { UserSelect } from '../../component/user-select';
import { TaskTypeSelect } from '../../component/task-type-select';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());
  // 关闭弹窗
  const onCancel = () => {
    close();
    form.resetFields();
  };
  //打开弹窗
  const onOK = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      // 先渲染
      forceRender={true}
      onCancel={onCancel}
      onOk={onOK}
      okText={'确认'}
      cancelText={'取消'}
      confirmLoading={editLoading}
      title={'编辑任务'}
      visible={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form}>
        <Form.Item
          label={'任务名'}
          name={'name'}
          rules={[{ required: true, message: '请输入任务名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={'经办人'} name={'processorId'}>
          <UserSelect defaultOptionName={'经办人'} />
        </Form.Item>
        <Form.Item label={'类型'} name={'typeId'}>
          <TaskTypeSelect defaultOptionName={'经办人'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
