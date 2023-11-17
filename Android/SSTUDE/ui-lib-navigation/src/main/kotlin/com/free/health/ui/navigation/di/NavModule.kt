package com.free.health.ui.navigation.di

import com.free.health.ui.navigation.NavigationManager
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class NavModule {

    @Singleton
    @Provides
    fun providesNavigationManager() = NavigationManager()
}