package com.free.health.data.healthconnect.entity.request

import com.google.gson.annotations.SerializedName

data class RecordRequest(
    @SerializedName("steps")
    val steps: Int,
    @SerializedName("sleepTime")
    val sleepDuration: Int,
    @SerializedName("burntKcal")
    val activeCalories: Int,
    @SerializedName("consumedKcal")
    val consumedCalories: Int
)

