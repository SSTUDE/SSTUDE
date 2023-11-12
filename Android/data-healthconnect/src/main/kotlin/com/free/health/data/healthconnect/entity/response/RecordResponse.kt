package com.free.health.data.healthconnect.entity.response

import com.free.health.domain.healthdata.HealthDataCalories
import com.google.gson.annotations.SerializedName
import java.time.LocalDateTime

data class RecordResponse(
    @SerializedName("id") val id: String,
    @SerializedName("memberId") val memberId: Long,
    @SerializedName("burntKcal") val burntKcal: Int,
    @SerializedName("consumedKcal") val consumedKcal: Int,
    @SerializedName("sleepTime") val sleepTime: Int,
    @SerializedName("steps") val steps: Int
)
