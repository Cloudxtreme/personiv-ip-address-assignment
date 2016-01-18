<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\NetworkSwitch;
use App\Port;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class NetworkSwitchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('network_switches')->select('*', DB::raw('UPPER(LEFT(name,1)) as first_letter'))->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'string',
            'ports' => 'required|numeric',
        ]);

        /* Create a new instance of switch */
        $network_switch = new NetworkSwitch;

        $network_switch->name = $request->name;
        $network_switch->description = $request->description ? $request->description : null;

        $network_switch->save();

        /* Iterate over number of ports given and create a record */
        for ($i=0; $i < $request->ports; $i++) { 
            $port = new Port;

            $port->name = $i + 1;
            $port->network_switch_id = $network_switch->id;

            $port->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // return NetworkSwitch::where('id', $id)->first();
        return response()->json(DB::table('network_switches')->select('*', DB::raw('UPPER(LEFT(name,1)) as first_letter'))->where('id', $id)->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'string',
        ]);

        /* Create a new instance of switch */
        $network_switch = NetworkSwitch::where('id', $id)->first();

        $network_switch->name = $request->name;
        $network_switch->description = $request->description ? $request->description : null;

        $network_switch->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // deletes the network switch records.
        NetworkSwitch::where('id', $id)->delete();

        // and its ports
        Port::where('network_switch_id')->delete();
    }
}
