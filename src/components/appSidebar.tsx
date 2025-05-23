import React from 'react';
import { useState } from 'react';
import {
    IconBellRinging,
    IconDatabaseImport,
    IconSettings,
} from '@tabler/icons-react';
import { Code, Group, Text } from '@mantine/core';
import classes from './appSidebar.module.css';
import { Link } from 'react-router';
//import LogoImage from '~/assets/clock-img.jpeg';

const data = [
    { link: 'Dashboard', label: 'Dashboard', icon: IconBellRinging },
    { link: 'Dopcan', label: 'Other Settings', icon: IconSettings },
    { link: 'DataSettings', label: 'Data Settings', icon: IconDatabaseImport },
];

export function AppSidebar() {
    const [active, setActive] = useState('Dashboard');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            to={item.link}
            key={item.label}
            onClick={() => {
                setActive(item.label);
            }}>
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <div>
                        {/* <img src={LogoImage} alt="Logo" width="32px" /> */}
                        <Text
                            size="lg"
                            fw={700}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'violet', deg: 90 }}>
                            timeeo
                        </Text>
                    </div>
                    <Code fw={700}>v0.0.1</Code>
                </Group>
                {links}
            </div>

            <div className={classes.footer}></div>
        </nav>
    );
}
