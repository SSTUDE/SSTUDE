package com.free.health.data.healthconnect.main

import android.content.Context
import androidx.activity.result.contract.ActivityResultContract
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.changes.Change
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.*
import androidx.health.connect.client.records.metadata.DataOrigin
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ChangesTokenRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.health.connect.client.units.Energy
import androidx.health.connect.client.units.Length
import androidx.health.connect.client.units.Mass
import androidx.health.connect.client.units.Velocity
import com.free.health.domain.healthdata.HealthData
import com.free.health.domain.healthdata.models.HealthDataState
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.*
import java.io.IOException
import java.time.Instant
import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit
import javax.inject.Inject
import kotlin.random.Random
import kotlin.reflect.KClass

internal class HealthConnectManager @Inject constructor(
    @ApplicationContext private val context: Context
) : HealthData {

    override val permissions: Set<HealthPermission>
        get() = setOf(
//            HealthPermission.createReadPermission(
//                WeightRecord::class,
//            ),
            HealthPermission.createReadPermission(
                SleepSessionRecord::class
            ),
            HealthPermission.createReadPermission(
                SleepStageRecord::class
            ),
            HealthPermission.createReadPermission(
                NutritionRecord::class
            ),
            HealthPermission.createReadPermission(
                TotalCaloriesBurnedRecord::class
            ),
            HealthPermission.createReadPermission(
                ActiveCaloriesBurnedRecord::class
            ),
            HealthPermission.createReadPermission(
                StepsRecord::class
            ),
        )

    private val healthConnectClient by lazy { HealthConnectClient.getOrCreate(context) }

    private val _state =
        MutableStateFlow(HealthDataState(isPermissionsGranted = false, isAvailable = false))
    override var state = _state.asStateFlow()

    override fun checkAvailability() {
        _state.update { it.copy(isAvailable = HealthConnectClient.isProviderAvailable(context)) }
    }

    override suspend fun checkIfAllPermissionsAreGranted() {
        if (_state.value.isAvailable) {
            _state.update { it.copy(isPermissionsGranted = hasAllPermissions(permissions)) }
        }
    }

    private suspend fun hasAllPermissions(permissions: Set<HealthPermission>): Boolean {
        return permissions == healthConnectClient.permissionController.getGrantedPermissions(
            permissions
        )
    }

    override fun requestPermissionsActivityContract(): ActivityResultContract<Set<HealthPermission>, Set<HealthPermission>> {
        return PermissionController.createRequestPermissionResultContract()
    }


    private suspend inline fun <reified T : Record> readData(
        timeRangeFilter: TimeRangeFilter,
        dataOriginFilter: Set<DataOrigin> = setOf()
    ): List<T> {
        val request = ReadRecordsRequest(
            recordType = T::class,
            dataOriginFilter = dataOriginFilter,
            timeRangeFilter = timeRangeFilter
        )
        return healthConnectClient.readRecords(request).records
    }


}
