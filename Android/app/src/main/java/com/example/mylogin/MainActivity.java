package com.example.mylogin;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import androidx.health.connect.client.HealthConnectClient;
import androidx.health.connect.client.records.*;
import androidx.health.connect.client.request.ReadRecordsRequest;
import androidx.health.connect.client.time.TimeRangeFilter;
import androidx.health.connect.client.units.Energy;
import androidx.health.connect.client.units.Mass;

public class MainActivity extends AppCompatActivity {
    private val healthConnectClient by lazy { HealthConnectClient.getOrCreate(this) }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


}