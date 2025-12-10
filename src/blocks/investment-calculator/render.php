<section class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">Wat brengt het op?</h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- LEFT COLUMN -->
        <div class="flex flex-col gap-8 lg:col-span-1">

            <!-- Bereken Rendement -->
            <div class="bg-[#EEF3ED] p-8 rounded-xl shadow-sm">
                <h3 class="text-2xl font-semibold mb-2">Bereken rendement</h3>
                <p class="text-gray-600 text-sm mb-4">Speel met de schuifjes en krijg een indicatie.</p>

                <div class="mb-6">
                    <label class="font-medium">Eenmalige inleg</label>
                    <div class="flex items-center justify-between text-gray-500 text-sm mb-1">
                        <span></span>
                        <div class="flex items-center gap-1">
                            € <input type="number" value="5500" class="border rounded p-1 w-20 text-right" />
                        </div>
                    </div>
                    <input type="range" min="0" max="20000" value="5500" class="w-full">
                </div>

                <div class="mb-6">
                    <label class="font-medium">Inleg per maand <span class="text-xs">(optioneel)</span></label>
                    <div class="flex items-center justify-between text-gray-500 text-sm mb-1">
                        <span></span>
                        <div class="flex items-center gap-1">
                            € <input type="number" value="300" class="border rounded p-1 w-20 text-right" />
                        </div>
                    </div>
                    <input type="range" min="0" max="1000" value="300" class="w-full">
                </div>

                <div class="mb-6">
                    <label class="font-medium">Hoe lang wil je beleggen?</label>
                    <div class="flex items-center justify-between text-gray-500 text-sm mb-1">
                        <span></span>
                        <span>15 jaar</span>
                    </div>
                    <input type="range" min="1" max="30" value="15" class="w-full">
                </div>

                <div>
                    <label class="font-medium">Kies risico</label>
                    <select class="border p-2 rounded w-full">
                        <option>Neutraal</option>
                        <option>Laag</option>
                        <option>Hoog</option>
                    </select>
                </div>
            </div>

            <!-- Verdeling portefeuille -->
            <div class="bg-[#FFF6E7] p-8 rounded-xl shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Verdeling portefeuille</h3>

                <div class="flex items-center justify-between">
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-700"></span> Microkrediet</li>
                        <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-yellow-600"></span> Obligaties</li>
                        <li class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-orange-500"></span> Aandelen</li>
                    </ul>

                    <div class="w-40 h-40 bg-gray-300 rounded-full"></div>
                </div>
            </div>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="flex flex-col gap-8 lg:col-span-2">

            <!-- Scenario's -->
            <div class="bg-[#F8F4EB] p-8 rounded-xl shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Scenario’s</h3>
                    <button class="text-sm border px-3 py-1 rounded">Vergroot</button>
                </div>
                <div class="w-full h-64 bg-gray-200 rounded"></div>
            </div>

            <!-- Verwacht resultaat -->
             <div class="bg-[#1F392B] text-white p-8 rounded-2xl shadow-sm">

    <h3 class="text-xl font-semibold mb-6">Verwacht resultaat</h3>

    <!-- Top row -->
    <div class="flex justify-between items-start mb-6">
        <span class="text-lg font-medium">Totaal vermogen na 15 jaar</span>
        <span class="text-lg font-semibold">€ 92.146</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

        <!-- LEFT COLUMN -->
        <ul class="text-sm space-y-3">
            <li class="flex justify-between border-b border-white/10 pb-2">
                <span>Totaal ingelegd</span><span>€ 59.500</span>
            </li>

            <li class="flex justify-between border-b border-white/10 pb-2">
                <span class="flex items-center gap-1">
                    Rendement 
                    <span class="text-xs opacity-70">ⓘ</span>
                </span>
                <span>€ 32.646</span>
            </li>

            <li class="flex justify-between border-b border-white/10 pb-2">
                <span>Tegenover sparen</span><span>€ 24.668</span>
            </li>

            <li class="flex justify-between border-b border-white/10 pb-2">
                <span class="flex items-center gap-1">
                    Inflatiecorrectie 
                    <span class="text-xs opacity-70">ⓘ</span>
                </span>
                <span>€ 1.123</span>
            </li>

            <li class="flex justify-between">
                <span>Hoeveel risico je neemt</span><span>Neutraal</span>
            </li>
        </ul>

        <!-- RIGHT COLUMN: CO2 block -->
        <div class="bg-white/10 p-5 rounded-xl text-sm space-y-3">
            <p>Je voorkomt <strong>320 kg CO₂</strong></p>

            <p class="flex items-start gap-3">
                <span class="text-green-300 font-semibold text-lg">🚗</span>
                <span>631.020 kilometers minder autorijden.</span>
            </p>

            <p class="flex items-start gap-3">
                <span class="text-green-300 font-semibold text-lg">🥩</span>
                <span>13.689 kilo’s minder varkensvlees eten.</span>
            </p>

            <p class="flex items-start gap-3">
                <span class="text-green-300 font-semibold text-lg">🚿</span>
                <span>20.069 uren minder douchen.</span>
            </p>
        </div>

    </div>

    <button class="mt-8 w-full bg-[#A4CEA3] text-[#12321E] py-3 rounded-lg font-semibold">
        Open [productnaam]rekening
    </button>
</div>


        </div>
    </div>
</section>
