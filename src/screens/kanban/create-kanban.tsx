import React, { useState } from 'react';
import { useKanbansQueryKey, useProjectIdInUrl } from './util';
import { useAddKanban } from 'utils/kanban';
import { Input } from 'antd';
import { Container } from './kanban-column';

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  // 异步
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  // add
  const submit = async () => {
    await addKanban({ name, projectId });
    console.log('+++++++++++++++++++++++++++++');
    setName('');
  };
  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Container>
  );
};
