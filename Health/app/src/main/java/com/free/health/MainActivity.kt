package com.free.health

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.records.HeartRateRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import java.time.Instant
import java.time.temporal.ChronoUnit

//import androidx.activity.compose.setContent



//class MainActivity : AppCompatActivity() {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//    }
//}

import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var healthConnectClient: HealthConnectClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        healthConnectClient = HealthConnectClient.getOrCreate(this)

        val start = Instant.now().minus(1, ChronoUnit.DAYS)
        val end = Instant.now()
        val request = ReadRecordsRequest(
            recordType = HeartRateRecord::class,
            timeRangeFilter = TimeRangeFilter.between(start, end)
        )

        lifecycleScope.launch {
            val response = healthConnectClient.readRecords(request)
            response.records.forEach { record ->
                Log.d("HealthData", "Heart rate: ${record.toString()}")
            }
        }


    }
}


//class MainActivity : ComponentActivity() {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//
//        val healthConnectManager = (application as BaseApplication).healthConnectManager
//
//        setContent {
//            HealthConnectApp(healthConnectManager = healthConnectManager)
//        }
//    }
//}