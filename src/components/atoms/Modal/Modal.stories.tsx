import React, { useState, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, Modal } from './Modal';
import '../../../main.css';

export default {
  title    : 'atoms/Modal',
  component: Modal
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsShow(true);
  }, []);

  const onClose = useCallback(() => {
    setIsShow(false);
  }, []);

  const props = Object.assign({}, args, { isShow, onClose });

  return (
    <React.Fragment>
      <button type="button" onClick={onClick} style={{ backgroundColor: '#fff' }}>Open</button>
      <Modal {...props}>
        <div>contents</div>
      </Modal>
    </React.Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  hasOverlay: false,
  title     : 'without overlay',
  asAlert   : false
};

export const Secondary = Template.bind({});

Secondary.args = {
  hasOverlay: true,
  title     : 'with overlay',
  asAlert   : false
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  hasOverlay: false,
  title     : 'without overlay',
  asAlert   : true
};
