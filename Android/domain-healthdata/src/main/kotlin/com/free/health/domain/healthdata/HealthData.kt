package com.free.health.domain.healthdata

import androidx.activity.result.contract.ActivityResultContract
import androidx.health.connect.client.permission.HealthPermission
import com.free.health.domain.healthdata.models.HealthDataState
import kotlinx.coroutines.flow.StateFlow

interface HealthData {

    val permissions: Set<HealthPermission>
    var state: StateFlow<HealthDataState>

    suspend fun checkIfAllPermissionsAreGranted()
    fun requestPermissionsActivityContract(): ActivityResultContract<Set<HealthPermission>, Set<HealthPermission>>
    fun checkAvailability()
}