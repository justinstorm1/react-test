import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    return (
        <NativeTabs minimizeBehavior='onScrollDown'>
            <NativeTabs.Trigger name='(home)'>
                <Icon sf={'house'} />
                <Label>Home</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}