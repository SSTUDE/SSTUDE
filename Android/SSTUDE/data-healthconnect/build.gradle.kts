version = ModuleVersions.LIBRARY_VERSION

plugins {
    id("library-plugin")
    id("kotlin-parcelize")
}

dependencies {
//    implementation(project(Dependencies.Modules.Domain.ENTITIES))
    implementation(project(Dependencies.Modules.Domain.BASE))
    implementation(project(Dependencies.Modules.Domain.HEALTH_DATA))

    implementation("androidx.health.connect:connect-client:1.0.0-alpha08")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation ("com.squareup.okhttp3:logging-interceptor:4.9.0")
    implementation ("com.squareup.retrofit2:converter-scalars:2.9.0")
//    runtimeOnly("org.jetbrains.kotlin:kotlin-parcelize-runtime:1.8.0")
}
