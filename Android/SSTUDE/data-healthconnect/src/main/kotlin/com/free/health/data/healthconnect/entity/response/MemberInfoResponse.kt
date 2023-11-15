package com.free.health.data.healthconnect.entity.response

import com.google.gson.annotations.SerializedName

data class MemberInfoResponse(
    @SerializedName("memberId") val memberId: Long,
    @SerializedName("status") val status: Boolean,
    @SerializedName("accessToken") val accessToken: String,
    @SerializedName("refreshToken") val refreshToken: String,
    @SerializedName("refreshTokenExpirationTime") val refreshTokenExpirationTime: Long
)
