package com.free.health.data.healthconnect.reposistory

import android.util.Log
import com.free.health.data.healthconnect.api.ApiClient
import com.free.health.data.healthconnect.api.MainService
import com.free.health.data.healthconnect.entity.request.LoginRequest
import com.free.health.data.healthconnect.entity.request.RecordRequest
import com.free.health.data.healthconnect.entity.response.MemberInfoResponse
import com.free.health.data.healthconnect.entity.response.RecordResponse
import com.google.gson.Gson
import retrofit2.Response

import javax.inject.Inject

//class HealthRepository @Inject constructor(private val service: MainService) {
//    suspend fun login(certification: String) =
//        service.login(LoginRequest(certification))
//
//    suspend fun sendRecordData(recordRequest: RecordRequest, accessToken: String) =
//        service.sendRecordData(recordRequest, accessToken)
//}

class HealthRepository @Inject constructor(private val service: MainService) {
    private val gson = Gson()

    suspend fun login(certification: String): Response<MemberInfoResponse> {
        val request = LoginRequest(certification)
        Log.d("로그인 요청Json", gson.toJson(request))
        return service.login(request)
    }

    suspend fun sendRecordData(recordRequest: RecordRequest, accessToken: String): Response<RecordResponse> {
        Log.d("레코드 요청 Json", gson.toJson(recordRequest))
        return service.sendRecordData(recordRequest, accessToken)
    }
}