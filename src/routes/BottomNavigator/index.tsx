import React from 'react'
import { useIsFocused, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme, Portal, FAB } from 'react-native-paper'
import { useSafeArea } from 'react-native-safe-area-context'
import color from 'color'
import overlay from 'util/overlay'
import { FeedScreen } from 'screens/Feed'
import { NotificationsScreen } from 'screens/Notifications'
import { BeerTab } from 'screens/BeerTab'
import { Zoom } from 'components/Animations/Zoom'

import { BottomNavigatorProps } from './types'

const Tab = createMaterialBottomTabNavigator()

export const BottomNavigator = ({ route }: BottomNavigatorProps) => {
  const navigation = useNavigation()
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'

  const theme = useTheme()
  const safeArea = useSafeArea()
  const isFocused = useIsFocused()

  let icon = 'feather'

  switch (routeName) {
    case 'BeerTab':
      icon = 'glass-mug-variant'
      break
    default:
      icon = 'feather'
      break
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) as string)
    : theme.colors.surface

  const handleFabPress = () => {
    switch (routeName) {
      case 'BeerTab':
        navigation.navigate('GiveBeerList')
        break
      default:
        break
    }
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName='Feed'
        backBehavior='initialRoute'
        shifting
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled
      >
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={{
            tabBarIcon: 'newspaper-variant-outline',
            tabBarColor,
          }}
        />

        <Tab.Screen
          name='Notifications'
          component={NotificationsScreen}
          options={{
            tabBarIcon: 'bell-outline',
            tabBarColor,
          }}
        />

        <Tab.Screen
          name='BeerTab'
          component={BeerTab}
          options={{
            tabBarIcon: 'file-document-edit-outline',
            tabBarColor,
            tabBarLabel: 'Beer Tab',
            title: 'Beer Tab',
          }}
        />
      </Tab.Navigator>

      <Portal>
        <Zoom
          show={routeName === 'BeerTab'}
          maxZoomOut={0}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
        >
          <FAB
            visible={isFocused}
            icon={icon}
            color='white'
            theme={{ colors: { accent: theme.colors.primary } }}
            onPress={handleFabPress}
          />
        </Zoom>
      </Portal>
    </>
  )
}
