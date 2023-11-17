package com.free.health.ui.widgets.overview

import androidx.glance.appwidget.GlanceAppWidgetReceiver
import com.free.health.ui.widgets.overview.OverviewWidget

class SstudeWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget = OverviewWidget()
}