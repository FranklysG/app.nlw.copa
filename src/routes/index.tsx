import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';

export function Routes() {
    const { } = useAuth();
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}