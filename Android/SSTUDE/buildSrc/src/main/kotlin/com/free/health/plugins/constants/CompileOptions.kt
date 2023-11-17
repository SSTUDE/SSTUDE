package com.free.health.plugins.constants

import com.android.build.gradle.internal.CompileOptions
import org.gradle.api.JavaVersion

fun CompileOptions.setDefaultCompileOptions() {
    // isCoreLibraryDesugaringEnabled = true
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}