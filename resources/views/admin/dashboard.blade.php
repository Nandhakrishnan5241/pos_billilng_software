{{-- <x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout> --}}


@extends('layouts.admin')
 
@section('title', 'Dashboard')

@section('content')
    <h4 class="mt-4 text-uppercase">Dashboard</h4>
    <hr>
    <div class="row">
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body h5">Total Category<span class="float-end">100</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-info text-white mb-4">
                <div class="card-body h5">Total Products<span class="float-end">500</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-warning text-white mb-4">
                <div class="card-body h5">Available Products<span class="float-end">250</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-danger text-white mb-4">
                <div class="card-body h5">Unavailable Products<span class="float-end">250</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-success text-white mb-4">
                <div class="card-body h5">Total Member<span class="float-end">50</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-sm-6  col-md-4 col-xl-3">
            <div class="card bg-secondary text-white mb-4">
                <div class="card-body h5">Today Sales<span class="float-end">150</span></div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white" href="#">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
@endsection
