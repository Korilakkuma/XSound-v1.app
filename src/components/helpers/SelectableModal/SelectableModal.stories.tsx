import React, { useState, useCallback } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Props, SelectableModal } from './SelectableModal';
import '../../../main.css';

export default {
  title    : 'helpers/SelectableModal',
  component: SelectableModal
} as Meta;

const Template: Story<Props> = (args: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClick = useCallback(() => {
    setIsShow(true);
  }, []);

  const onClose = useCallback(() => {
    setIsShow(false);
  }, []);

  const first = {
    label : 'first',
    action: useCallback((event: React.SyntheticEvent) => {
      alert(`${event.type} first`);
      onClose();
    }, [onClose])
  };

  const second = {
    label : 'second',
    action: useCallback((event: React.SyntheticEvent) => {
      alert(`${event.type} second`);
      onClose();
    }, [onClose])
  };

  const props = Object.assign({}, args, { isShow, onClose, first, second });

  return (
    <React.Fragment>
      <button type="button" onClick={onClick} style={{ backgroundColor: '#fff' }}>Open</button>
      <SelectableModal {...props} />
    </React.Fragment>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  hasOverlay: false,
  title     : 'without overlay'
};

export const Secondary = Template.bind({});

Secondary.args = {
  hasOverlay: true,
  title     : 'with overlay'
};
