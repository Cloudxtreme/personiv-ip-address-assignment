<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Port;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PortController extends Controller
{
    public function networkSwitch($network_switch_id)
    {
        return Port::where('network_switch_id', $network_switch_id)->get();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    public function multipleUpdate(Request $request)
    {
        for ($i=0; $i < count($request->all()); $i++) { 
            $this->validate($request, [
                $i.'.description' => 'string',
                $i.'.data' => 'numeric',
                $i.'.vlan' => 'numeric',
            ]);

            $port = Port::where('id', $request->input($i. '.id'))->first();

            $port->data = $request->input($i.'.data') ? $request->input($i.'.data') : null;
            $port->vlan = $request->input($i.'.vlan') ? $request->input($i.'.vlan') : null;

            $port->save();
        }
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
