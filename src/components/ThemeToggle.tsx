import React from 'react';
import {IconMoon, IconSun} from '@tabler/icons-react';
import cx from 'clsx';
import {ActionIcon, Group, useComputedColorScheme, useMantineColorScheme} from '@mantine/core';
import classes from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', {
        getInitialValueInEffect: true,
    });

    return (
        <Group justify='center'>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant='default'
                size='xl'
                radius='md'
                aria-label='Toggle color scheme'>
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </Group>
    );
}
