<?php

namespace Database\Seeders;

use App\Models\Timezone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimezoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timezone = Timezone::insert([
           
            array (
                'name' => 'Dateline Standard Time',
                'abbr' => 'DST',
                'offset' => -12,
                'isdst' => false,
                'text' => '(UTC-12:00) International Date Line West',
                'status' => 0 
            ),
            array (
                'name' => 'UTC-11',
                'abbr' => 'U',
                'offset' => -11,
                'isdst' => false,
                'text' => '(UTC-11:00) Coordinated Universal Time-11',
                'status' => 0 
            ),
            array (
                'name' => 'Hawaiian Standard Time',
                'abbr' => 'HST',
                'offset' => -10,
                'isdst' => false,
                'text' => '(UTC-10:00) Hawaii',
                'status' => 0 
            ),
            array (
                'name' => 'Alaskan Standard Time',
                'abbr' => 'AKDT',
                'offset' => -8,
                'isdst' => true,
                'text' => '(UTC-09:00) Alaska',
                'status' => 0 
            ),
            array (
                'name' => 'Pacific Standard Time (Mexico)',
                'abbr' => 'PDT',
                'offset' => -7,
                'isdst' => true,
                'text' => '(UTC-08:00) Baja California',
                'status' => 0
            ),
            array (
                'name' => 'Pacific Daylight Time',
                'abbr' => 'PDT',
                'offset' => -7,
                'isdst' => true,
                'text' => '(UTC-07:00) Pacific Daylight Time (US & Canada)',
                'status' => 1
            ),
            array (
                'name' => 'Pacific Standard Time',
                'abbr' => 'PST',
                'offset' => -8,
                'isdst' => false,
                'text' => '(UTC-08:00) Pacific Standard Time (US & Canada)',
                'status' => 1
            ),
            array (
                'name' => 'US Mountain Standard Time',
                'abbr' => 'UMST',
                'offset' => -7,
                'isdst' => false,
                'text' => '(UTC-07:00) Arizona',
                'status' => 0
            ),
            array (
                'name' => 'Mountain Standard Time (Mexico)',
                'abbr' => 'MDT',
                'offset' => -6,
                'isdst' => true,
                'text' => '(UTC-07:00) Chihuahua, La Paz, Mazatlan',
                'status' => 0
            ),
            array (
                'name' => 'Mountain Standard Time',
                'abbr' => 'MDT',
                'offset' => -6,
                'isdst' => true,
                'text' => '(UTC-07:00) Mountain Time (US & Canada)',
                'status' => 1
            ),
            array (
                'name' => 'Central America Standard Time',
                'abbr' => 'CAST',
                'offset' => -6,
                'isdst' => false,
                'text' => '(UTC-06:00) Central America',
                'status' => 1
            ),
            array (
                'name' => 'Central Standard Time',
                'abbr' => 'CDT',
                'offset' => -5,
                'isdst' => true,
                'text' => '(UTC-06:00) Central Time (US & Canada)',
                'status' => 1
            ),
            array (
                'name' => 'Central Standard Time (Mexico)',
                'abbr' => 'CDT',
                'offset' => -5,
                'isdst' => true,
                'text' => '(UTC-06:00) Guadalajara, Mexico City, Monterrey',
                'status' => 0
            ),
            array (
                'name' => 'Canada Central Standard Time',
                'abbr' => 'CCST',
                'offset' => -6,
                'isdst' => false,
                'text' => '(UTC-06:00) Saskatchewan',
                'status' => 1
            ),
            array (
                'name' => 'SA Pacific Standard Time',
                'abbr' => 'SPST',
                'offset' => -5,
                'isdst' => false,
                'text' => '(UTC-05:00) Bogota, Lima, Quito',
                'status' => 0 
            ),
            array (
                'name' => 'Eastern Standard Time',
                'abbr' => 'EST',
                'offset' => -5,
                'isdst' => false,
                'text' => '(UTC-05:00) Eastern Time (US & Canada)',
                'status' => 0 
            ),
            array (
                'name' => 'Eastern Daylight Time',
                'abbr' => 'EDT',
                'offset' => -4,
                'isdst' => true,
                'text' => '(UTC-04:00) Eastern Daylight Time (US & Canada)',
                'status' => 0
            ), 
            array (
                'name' => 'US Eastern Standard Time',
                'abbr' => 'UEDT',
                'offset' => -5,
                'isdst' => false,
                'text' => '(UTC-05:00) Indiana (East)',
                'status' => 0
            ), 
            array (
                'name' => 'Venezuela Standard Time',
                'abbr' => 'VST',
                'offset' => -4.5,
                'isdst' => false,
                'text' => '(UTC-04:30) Caracas',
                'status' => 0 
            ),
            array (
                'name' => 'Paraguay Standard Time',
                'abbr' => 'PYT',
                'offset' => -4,
                'isdst' => false,
                'text' => '(UTC-04:00) Asuncion',
                'status' => 0 
            ),
            array (
                'name' => 'Atlantic Standard Time',
                'abbr' => 'ADT',
                'offset' => -3,
                'isdst' => true,
                'text' => '(UTC-04:00) Atlantic Time (Canada)',
                'status' => 0 
            ),
            array (
                'name' => 'Central Brazilian Standard Time',
                'abbr' => 'CBST',
                'offset' => -4,
                'isdst' => false,
                'text' => '(UTC-04:00) Cuiaba',
                'status' => 0 
            ),
            array (
                'name' => 'SA Western Standard Time',
                'abbr' => 'SWST',
                'offset' => -4,
                'isdst' => false,
                'text' => '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan',
                'status' => 0 
            ),
            array (
                'name' => 'Pacific SA Standard Time',
                'abbr' => 'PSST',
                'offset' => -4,
                'isdst' => false,
                'text' => '(UTC-04:00) Santiago',
                'status' => 0 
            ),
            array (
                'name' => 'Newfoundland Standard Time',
                'abbr' => 'NDT',
                'offset' => -2.5,
                'isdst' => true,
                'text' => '(UTC-03:30) Newfoundland',
                'status' => 0
            ), 
            array (
                'name' => 'E. South America Standard Time',
                'abbr' => 'ESAST',
                'offset' => -3,
                'isdst' => false,
                'text' => '(UTC-03:00) Brasilia',
                'status' => 0 
            ),
            array (
                'name' => 'Argentina Standard Time',
                'abbr' => 'AST',
                'offset' => -3,
                'isdst' => false,
                'text' => '(UTC-03:00) Buenos Aires',
                'status' => 0 
            ),
            array (
                'name' => 'SA Eastern Standard Time',
                'abbr' => 'SEST',
                'offset' => -3,
                'isdst' => false,
                'text' => '(UTC-03:00) Cayenne, Fortaleza',
                'status' => 0
            ), 
            array (
                'name' => 'Greenland Standard Time',
                'abbr' => 'GDT',
                'offset' => -3,
                'isdst' => true,
                'text' => '(UTC-03:00) Greenland',
                'status' => 0 
            ),
            array (
                'name' => 'Montevideo Standard Time',
                'abbr' => 'MST',
                'offset' => -3,
                'isdst' => false,
                'text' => '(UTC-03:00) Montevideo',
                'status' => 0 
            ),
            array (
                'name' => 'Bahia Standard Time',
                'abbr' => 'BST',
                'offset' => -3,
                'isdst' => false,
                'text' => '(UTC-03:00) Salvador',
                'status' => 0 
            ),
            array (
                'name' => 'UTC-02',
                'abbr' => 'U',
                'offset' => -2,
                'isdst' => false,
                'text' => '(UTC-02:00) Coordinated Universal Time-02',
                'status' => 0 
            ),
            array (
                'name' => 'Mid-Atlantic Standard Time',
                'abbr' => 'MDT',
                'offset' => -1,
                'isdst' => true,
                'text' => '(UTC-02:00) Mid-Atlantic - Old',
                'status' => 0
            ), 
            array (
                'name' => 'Azores Standard Time',
                'abbr' => 'ADT',
                'offset' => 0,
                'isdst' => true,
                'text' => '(UTC-01:00) Azores',
                'status' => 0 
            ),
            array (
                'name' => 'Cape Verde Standard Time',
                'abbr' => 'CVST',
                'offset' => -1,
                'isdst' => false,
                'text' => '(UTC-01:00) Cape Verde Is.',
                'status' => 0 
            ),
            array (
                'name' => 'Morocco Standard Time',
                'abbr' => 'MDT',
                'offset' => 1,
                'isdst' => true,
                'text' => '(UTC) Casablanca',
                'status' => 0 
            ),
            array (
                'name' => 'UTC',
                'abbr' => 'UTC',
                'offset' => 0,
                'isdst' => false,
                'text' => '(UTC) Coordinated Universal Time',
                'status' => 1
            ),
            array (
                'name' => 'GMT Standard Time',
                'abbr' => 'GMT',
                'offset' => 0,
                'isdst' => false,
                'text' => '(UTC) Edinburgh, London',
                'status' => 1
            ), 
            array (
                'name' => 'British Summer Time',
                'abbr' => 'BST',
                'offset' => 1,
                'isdst' => true,
                'text' => '(UTC+01:00) Edinburgh, London',
                'status' => 0 
            ), 
            array (
                'name' => 'GMT Standard Time',
                'abbr' => 'GDT',
                'offset' => 1,
                'isdst' => true,
                'text' => '(UTC) Dublin, Lisbon',
                'status' => 0
            ), 
            array (
                'name' => 'Greenwich Standard Time',
                'abbr' => 'GST',
                'offset' => 0,
                'isdst' => false,
                'text' => '(UTC) Monrovia, Reykjavik',
                'status' => 0 
            ),
            array (
                'name' => 'W. Europe Standard Time',
                'abbr' => 'WEDT',
                'offset' => 2,
                'isdst' => true,
                'text' => '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
                'status' => 0 
            ),
            array (
                'name' => 'Central Europe Standard Time',
                'abbr' => 'CEDT',
                'offset' => 2,
                'isdst' => true,
                'text' => '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
                'status' => 0 
            ),
            array (
                'name' => 'Romance Standard Time',
                'abbr' => 'RDT',
                'offset' => 2,
                'isdst' => true,
                'text' => '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
                'status' => 0 
            ),
            array (
                'name' => 'Central European Standard Time',
                'abbr' => 'CEDT',
                'offset' => 2,
                'isdst' => true,
                'text' => '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
                'status' => 0 
            ),
            array (
                'name' => 'W. Central Africa Standard Time',
                'abbr' => 'WCAST',
                'offset' => 1,
                'isdst' => false,
                'text' => '(UTC+01:00) West Central Africa',
                'status' => 0 
            ),
            array (
                'name' => 'Namibia Standard Time',
                'abbr' => 'NST',
                'offset' => 1,
                'isdst' => false,
                'text' => '(UTC+01:00) Windhoek',
                'status' => 0 
            ),
            array (
                'name' => 'GTB Standard Time',
                'abbr' => 'GDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) Athens, Bucharest',
                'status' => 0 
            ),
            array (
                'name' => 'Middle East Standard Time',
                'abbr' => 'MEDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) Beirut',
                'status' => 0 
            ),
            array (
                'name' => 'Egypt Standard Time',
                'abbr' => 'EST',
                'offset' => 2,
                'isdst' => false,
                'text' => '(UTC+02:00) Cairo',
                'status' => 0 
            ),
            array (
                'name' => 'Syria Standard Time',
                'abbr' => 'SDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) Damascus',
                'status' => 0 
            ),
            array (
                'name' => 'E. Europe Standard Time',
                'abbr' => 'EEDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) E. Europe',
                'status' => 0 
            ),
            array (
                'name' => 'South Africa Standard Time',
                'abbr' => 'SAST',
                'offset' => 2,
                'isdst' => false,
                'text' => '(UTC+02:00) Harare, Pretoria',
                'status' => 0 
            ),
            array (
                'name' => 'FLE Standard Time',
                'abbr' => 'FDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
                'status' => 0 
            ),
            array (
                'name' => 'Turkey Standard Time',
                'abbr' => 'TDT',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Istanbul',
                'status' => 0 
            ),
            array (
                'name' => 'Israel Standard Time',
                'abbr' => 'JDT',
                'offset' => 3,
                'isdst' => true,
                'text' => '(UTC+02:00) Jerusalem',
                'status' => 0 
            ),
            array (
                'name' => 'Libya Standard Time',
                'abbr' => 'LST',
                'offset' => 2,
                'isdst' => false,
                'text' => '(UTC+02:00) Tripoli',
                'status' => 0 
            ),
            array (
                'name' => 'Jordan Standard Time',
                'abbr' => 'JST',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Amman',
                'status' => 0 
            ),
            array (
                'name' => 'Arabic Standard Time',
                'abbr' => 'AST',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Baghdad',
                'status' => 0 
            ),
            array (
                'name' => 'Kaliningrad Standard Time',
                'abbr' => 'KST',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+02:00) Kaliningrad',
                'status' => 0 
            ),
            array (
                'name' => 'Arab Standard Time',
                'abbr' => 'AST',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Kuwait, Riyadh',
                'status' => 0 
            ),
            array (
                'name' => 'E. Africa Standard Time',
                'abbr' => 'EAST',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Nairobi',
                'status' => 0 
            ),
            array (
                'name' => 'Moscow Standard Time',
                'abbr' => 'MSK',
                'offset' => 3,
                'isdst' => false,
                'text' => '(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk',
                'status' => 0 
            ),
            array (
                'name' => 'Samara Time',
                'abbr' => 'SAMT',
                'offset' => 4,
                'isdst' => false,
                'text' => '(UTC+04:00) Samara, Ulyanovsk, Saratov',
                'status' => 0 
            ),
            array (
                'name' => 'Iran Standard Time',
                'abbr' => 'IDT',
                'offset' => 4.5,
                'isdst' => true,
                'text' => '(UTC+03:30) Tehran',
                'status' => 0 
            ),
            array (
                'name' => 'Arabian Standard Time',
                'abbr' => 'AST',
                'offset' => 4,
                'isdst' => false,
                'text' => '(UTC+04:00) Abu Dhabi, Muscat',
                'status' => 0 
            ),
            array (
                'name' => 'Azerbaijan Standard Time',
                'abbr' => 'ADT',
                'offset' => 5,
                'isdst' => true,
                'text' => '(UTC+04:00) Baku',
                'status' => 0 
            ),
            array (
                'name' => 'Mauritius Standard Time',
                'abbr' => 'MST',
                'offset' => 4,
                'isdst' => false,
                'text' => '(UTC+04:00) Port Louis',
                'status' => 0
            ), 
            array (
                'name' => 'Georgian Standard Time',
                'abbr' => 'GET',
                'offset' => 4,
                'isdst' => false,
                'text' => '(UTC+04:00) Tbilisi',
                'status' => 0 
            ),
            array (
                'name' => 'Caucasus Standard Time',
                'abbr' => 'CST',
                'offset' => 4,
                'isdst' => false,
                'text' => '(UTC+04:00) Yerevan',
                'status' => 0 
            ),
            array (
                'name' => 'Afghanistan Standard Time',
                'abbr' => 'AST',
                'offset' => 4.5,
                'isdst' => false,
                'text' => '(UTC+04:30) Kabul',
                'status' => 0 
            ),
            array (
                'name' => 'West Asia Standard Time',
                'abbr' => 'WAST',
                'offset' => 5,
                'isdst' => false,
                'text' => '(UTC+05:00) Ashgabat, Tashkent',
                'status' => 0
            ), 
            array (
                'name' => 'Yekaterinburg Time',
                'abbr' => 'YEKT',
                'offset' => 5,
                'isdst' => false,
                'text' => '(UTC+05:00) Yekaterinburg',
                'status' => 0 
            ),
            array (
                'name' => 'Pakistan Standard Time',
                'abbr' => 'PKT',
                'offset' => 5,
                'isdst' => false,
                'text' => '(UTC+05:00) Islamabad, Karachi',
                'status' => 0 
            ),
            array (
                'name' => 'India Standard Time',
                'abbr' => 'IST',
                'offset' => 5.5,
                'isdst' => false,
                'text' => '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
                'status' => 1
            ),
            array (
                'name' => 'Sri Lanka Standard Time',
                'abbr' => 'SLST',
                'offset' => 5.5,
                'isdst' => false,
                'text' => '(UTC+05:30) Sri Jayawardenepura',
                'status' => 0 
            ),
            array (
                'name' => 'Nepal Standard Time',
                'abbr' => 'NST',
                'offset' => 5.75,
                'isdst' => false,
                'text' => '(UTC+05:45) Kathmandu',
                'status' => 0 
            ),
            array (
                'name' => 'Central Asia Standard Time',
                'abbr' => 'CAST',
                'offset' => 6,
                'isdst' => false,
                'text' => '(UTC+06:00) Nur-Sultan (Astana)',
                'status' => 0 
            ),
            array (
                'name' => 'Bangladesh Standard Time',
                'abbr' => 'BST',
                'offset' => 6,
                'isdst' => false,
                'text' => '(UTC+06:00) Dhaka',
                'status' => 0 
            ),
            array (
                'name' => 'Myanmar Standard Time',
                'abbr' => 'MST',
                'offset' => 6.5,
                'isdst' => false,
                'text' => '(UTC+06:30) Yangon (Rangoon)',
                'status' => 0 
            ),
            array (
                'name' => 'SE Asia Standard Time',
                'abbr' => 'SAST',
                'offset' => 7,
                'isdst' => false,
                'text' => '(UTC+07:00) Bangkok, Hanoi, Jakarta',
                'status' => 0 
            ),
            array (
                'name' => 'N. Central Asia Standard Time',
                'abbr' => 'NCAST',
                'offset' => 7,
                'isdst' => false,
                'text' => '(UTC+07:00) Novosibirsk',
                'status' => 0 
            ),
            array (
                'name' => 'China Standard Time',
                'abbr' => 'CST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
                'status' => 0 
            ),
            array (
                'name' => 'North Asia Standard Time',
                'abbr' => 'NAST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Krasnoyarsk',
                'status' => 0 
            ),
            array (
                'name' => 'Singapore Standard Time',
                'abbr' => 'MPST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Kuala Lumpur, Singapore',
                'status' => 0 
            ),
            array (
                'name' => 'W. Australia Standard Time',
                'abbr' => 'WAST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Perth',
                'status' => 0 
            ),
            array (
                'name' => 'Taipei Standard Time',
                'abbr' => 'TST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Taipei',
                'status' => 0 
            ),
            array (
                'name' => 'Ulaanbaatar Standard Time',
                'abbr' => 'UST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Ulaanbaatar',
                'status' => 0 
            ),
            array (
                'name' => 'North Asia East Standard Time',
                'abbr' => 'NAEST',
                'offset' => 8,
                'isdst' => false,
                'text' => '(UTC+08:00) Irkutsk',
                'status' => 0 
            ),
            array (
                'name' => 'Japan Standard Time',
                'abbr' => 'JST',
                'offset' => 9,
                'isdst' => false,
                'text' => '(UTC+09:00) Osaka, Sapporo, Tokyo',
                'status' => 0 
            ),
            array (
                'name' => 'Korea Standard Time',
                'abbr' => 'KST',
                'offset' => 9,
                'isdst' => false,
                'text' => '(UTC+09:00) Seoul',
                'status' => 0 
            ),
            array (
                'name' => 'Cen. Australia Standard Time',
                'abbr' => 'CAST',
                'offset' => 9.5,
                'isdst' => false,
                'text' => '(UTC+09:30) Adelaide',
                'status' => 0 
            ),
            array (
                'name' => 'AUS Central Standard Time',
                'abbr' => 'ACST',
                'offset' => 9.5,
                'isdst' => false,
                'text' => '(UTC+09:30) Darwin',
                'status' => 0 
            ),
            array (
                'name' => 'E. Australia Standard Time',
                'abbr' => 'EAST',
                'offset' => 10,
                'isdst' => false,
                'text' => '(UTC+10:00) Brisbane',
                'status' => 0 
            ),
            array (
                'name' => 'AUS Eastern Standard Time',
                'abbr' => 'AEST',
                'offset' => 10,
                'isdst' => false,
                'text' => '(UTC+10:00) Canberra, Melbourne, Sydney',
                'status' => 0 
            ),
            array (
                'name' => 'West Pacific Standard Time',
                'abbr' => 'WPST',
                'offset' => 10,
                'isdst' => false,
                'text' => '(UTC+10:00) Guam, Port Moresby',
                'status' => 0 
            ),
            array (
                'name' => 'Tasmania Standard Time',
                'abbr' => 'TST',
                'offset' => 10,
                'isdst' => false,
                'text' => '(UTC+10:00) Hobart',
                'status' => 0
            ), 
            array (
                'name' => 'Yakutsk Standard Time',
                'abbr' => 'YST',
                'offset' => 9,
                'isdst' => false,
                'text' => '(UTC+09:00) Yakutsk',
                'status' => 0 
            ),
            array (
                'name' => 'Central Pacific Standard Time',
                'abbr' => 'CPST',
                'offset' => 11,
                'isdst' => false,
                'text' => '(UTC+11:00) Solomon Is., New Caledonia',
                'status' => 0
            ), 
            array (
                'name' => 'Vladivostok Standard Time',
                'abbr' => 'VST',
                'offset' => 11,
                'isdst' => false,
                'text' => '(UTC+11:00) Vladivostok',
                'status' => 0 
            ),
            array (
                'name' => 'New Zealand Standard Time',
                'abbr' => 'NZST',
                'offset' => 12,
                'isdst' => false,
                'text' => '(UTC+12:00) Auckland, Wellington',
                'status' => 0
            ), 
            array (
                'name' => 'UTC+12',
                'abbr' => 'U',
                'offset' => 12,
                'isdst' => false,
                'text' => '(UTC+12:00) Coordinated Universal Time+12',
                'status' => 0 
            ),
            array (
                'name' => 'Fiji Standard Time',
                'abbr' => 'FST',
                'offset' => 12,
                'isdst' => false,
                'text' => '(UTC+12:00) Fiji',
                'status' => 0 
            ),
            array (
                'name' => 'Magadan Standard Time',
                'abbr' => 'MST',
                'offset' => 12,
                'isdst' => false,
                'text' => '(UTC+12:00) Magadan',
                'status' => 0
            ), 
            array (
                'name' => 'Kamchatka Standard Time',
                'abbr' => 'KDT',
                'offset' => 13,
                'isdst' => true,
                'text' => '(UTC+12:00) Petropavlovsk-Kamchatsky - Old',
                'status' => 0 
            ),
            array (
                'name' => 'Tonga Standard Time',
                'abbr' => 'TST',
                'offset' => 13,
                'isdst' => false,
                'text' => '(UTC+13:00) Nuku\'alofa',
                'status' => 0 
            ),
            array (
                'name' => 'Samoa Standard Time',
                'abbr' => 'SST',
                'offset' => 13,
                'isdst' => false,
                'text' => '(UTC+13:00) Samoa',
                'status' => 0
            ),
            
        ]);
        $this->command->info('Timezone created successfully.');
    }
    // php artisan db:seed --class=TimezoneSeeder
}
