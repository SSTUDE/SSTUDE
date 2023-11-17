package com.free.health.data.healthconnect.entity.request

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import com.google.gson.annotations.SerializedName

@Parcelize
data class LoginRequest(
    @SerializedName("certification")
    val certification: String
) : Parcelable
