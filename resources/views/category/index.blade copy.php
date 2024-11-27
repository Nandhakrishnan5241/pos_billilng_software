@extends('layouts.admin')

@section('title', 'Category')
@section('content')
    <div class="mt-4 h4">Category<a href="{{url('category/add')}}" class="btn btn-primary float-end">Add Category</a></div>
    
    <hr>
    <div class="row">
        <div class="col-xl-3 col-md-4">
            <div class="card-container">
                <div class="category-card">
                    <img src="https://media.istockphoto.com/id/1273378551/photo/set-of-summer-fruits-and-berries-in-wooden-serving.jpg?s=2048x2048&w=is&k=20&c=T3OuYRySJb1amEksKLE_5eM1Uw_ww-jurpo1ZOGFaMM="
                        alt="">
                    <div class="card-content">
                        <h3>Fruits</h3>
                        <p>healthy and wealthy</p>
                        <a href="#" class="card-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-4">
            <div class="card-container">
                <div class="category-card">
                    <img src="https://media.istockphoto.com/id/1409236261/photo/healthy-food-healthy-eating-background-fruit-vegetable-berry-vegetarian-eating-superfood.jpg?s=2048x2048&w=is&k=20&c=AOJUGUDXqr7aYJhvW4-6sf1vzaUmBO1q3bRE5HBcEVs="
                        alt="">
                    <div class="card-content">
                        <h3> Vegetables</h3>
                        <p>good for immune system</p>
                        <a href="#" class="card-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-4">
            <div class="card-container">
                <div class="category-card">
                    <img src="https://media.istockphoto.com/id/1149135424/photo/group-of-sweet-and-salty-snacks-perfect-for-binge-watching.jpg?s=612x612&w=0&k=20&c=YAVqRyUJgj_nXpltYUPpaW_PYtd4v2TC5Mo0DtVFuoo="
                        alt="">
                    <div class="card-content">
                        <h3>Snacks</h3>
                        <p>for time pass</p>
                        <a href="#" class="card-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-4">
            <div class="card-container">
                <div class="category-card">
                    <img src="https://media.istockphoto.com/id/1232570251/photo/shelves-with-variety-refreshing-of-beverage-for-sale.jpg?s=2048x2048&w=is&k=20&c=72UusjPtPqeupMtwi7U-tdPOLbEiRcBN-A51Rto3sUU="
                        alt="">
                    <div class="card-content">
                        <h3>Drinks</h3>
                        <p>for energy</p>
                        <a href="#" class="card-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-4">
            <div class="card-container">
                <div class="category-card">
                    <img src="https://media.istockphoto.com/id/1315338184/photo/basket-with-brushes-rags-natural-sponges-and-cleaning-products.jpg?s=2048x2048&w=is&k=20&c=NTG1bQlhiTI7Weukuc3KUXET345jFnbry-enDTodtGI="
                        alt="">
                    <div class="card-content">
                        <h3>Household and cleaning</h3>
                        <p>for cleaning house</p>
                        <a href="#" class="card-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
