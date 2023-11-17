version = ModuleVersions.LIBRARY_VERSION

plugins {
    id("ui-plugin")
}

dependencies {
    implementation(project(Dependencies.Modules.UI.NAVIGATION))
    implementation(project(Dependencies.Modules.UI.COMMON))
    implementation(project(Dependencies.Modules.Domain.BASE))
//    implementation(project(Dependencies.Modules.Domain.STORES))
    implementation(project(Dependencies.Modules.Domain.HEALTH_DATA))
    implementation(project(Dependencies.Modules.Data.HEALTH_CONNECT))
//    implementation ("androidx.compose.runtime:runtime:1.5.4")
    implementation ("androidx.compose.material:material:1.3.0")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

}
