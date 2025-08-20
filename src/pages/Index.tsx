import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState('OSAGO');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  
  // Форма консультации
  const [consultationName, setConsultationName] = useState('');
  const [consultationPhone, setConsultationPhone] = useState('');
  const [consultationService, setConsultationService] = useState('ОСАГО');
  
  // ОСАГО
  const [carPower, setCarPower] = useState('');
  const [driverAge, setDriverAge] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  
  // КАСКО
  const [carValue, setCarValue] = useState('');
  const [carAge, setCarAge] = useState('');
  const [kaskoPrice, setKaskoPrice] = useState<number | null>(null);
  
  // Страхование жизни
  const [personAge, setPersonAge] = useState('');
  const [insuranceSum, setInsuranceSum] = useState('');
  const [lifePrice, setLifePrice] = useState<number | null>(null);
  
  // Страхование имущества (квартиры/дома)
  const [propertyValue, setPropertyValue] = useState('');
  const [propertyType, setPropertyType] = useState('apartment');
  const [propertyArea, setPropertyArea] = useState('');
  const [propertyPrice, setPropertyPrice] = useState<number | null>(null);
  
  // Страхование путешествий
  const [travelDays, setTravelDays] = useState('');
  const [travelersCount, setTravelersCount] = useState('');
  const [travelCountry, setTravelCountry] = useState('schengen');
  const [travelPrice, setTravelPrice] = useState<number | null>(null);
  
  // ДМС
  const [dmsAge, setDmsAge] = useState('');
  const [dmsPlan, setDmsPlan] = useState('basic');
  const [dmsPrice, setDmsPrice] = useState<number | null>(null);
  
  // НС
  const [nsAge, setNsAge] = useState('');
  const [nsSum, setNsSum] = useState('');
  const [nsPrice, setNsPrice] = useState<number | null>(null);

  const calculateOSAGO = () => {
    if (!carPower || !driverAge) return;
    
    const baseCost = 5000;
    const powerMultiplier = parseInt(carPower) > 150 ? 1.5 : 1.2;
    const ageMultiplier = parseInt(driverAge) < 25 ? 1.8 : parseInt(driverAge) > 50 ? 0.9 : 1.0;
    
    const finalCost = Math.round(baseCost * powerMultiplier * ageMultiplier);
    setCalculatedPrice(finalCost);
  };
  
  const calculateKASKO = () => {
    if (!carValue || !carAge) return;
    
    const valueNum = parseInt(carValue);
    const ageNum = parseInt(carAge);
    const baseRate = 0.08; // 8% от стоимости
    const ageMultiplier = ageNum > 5 ? 1.3 : ageNum > 3 ? 1.1 : 1.0;
    
    const finalCost = Math.round(valueNum * baseRate * ageMultiplier);
    setKaskoPrice(finalCost);
  };
  
  const calculateLife = () => {
    if (!personAge || !insuranceSum) return;
    
    const ageNum = parseInt(personAge);
    const sumNum = parseInt(insuranceSum);
    const baseRate = ageNum < 30 ? 0.015 : ageNum < 50 ? 0.025 : 0.04;
    
    const finalCost = Math.round(sumNum * baseRate);
    setLifePrice(finalCost);
  };
  
  const calculateProperty = () => {
    if (!propertyValue || !propertyArea) return;
    
    const valueNum = parseInt(propertyValue);
    const areaNum = parseInt(propertyArea);
    let baseRate = 0.003; // Базовая ставка
    
    // Коэффициент по типу недвижимости
    if (propertyType === 'house') baseRate = 0.005;
    if (propertyType === 'dacha') baseRate = 0.004;
    
    // Коэффициент по площади
    const areaMultiplier = areaNum > 200 ? 1.2 : areaNum > 100 ? 1.1 : 1.0;
    
    const finalCost = Math.round(valueNum * baseRate * areaMultiplier);
    setPropertyPrice(finalCost);
  };
  
  const calculateTravel = () => {
    if (!travelDays || !travelersCount) return;
    
    const days = parseInt(travelDays);
    const count = parseInt(travelersCount);
    let dailyRate = 50; // Базовая ставка за день
    
    // Коэффициент по стране
    if (travelCountry === 'schengen') dailyRate = 80;
    if (travelCountry === 'usa') dailyRate = 120;
    if (travelCountry === 'asia') dailyRate = 60;
    
    const finalCost = Math.round(days * count * dailyRate);
    setTravelPrice(finalCost);
  };
  
  const calculateDMS = () => {
    if (!dmsAge) return;
    
    const ageNum = parseInt(dmsAge);
    let baseCost = 25000; // Базовая стоимость
    
    // Коэффициент по возрасту
    const ageMultiplier = ageNum < 30 ? 0.8 : ageNum > 50 ? 1.5 : 1.0;
    
    // Коэффициент по плану
    let planMultiplier = 1.0;
    if (dmsPlan === 'standard') planMultiplier = 1.5;
    if (dmsPlan === 'premium') planMultiplier = 2.5;
    
    const finalCost = Math.round(baseCost * ageMultiplier * planMultiplier);
    setDmsPrice(finalCost);
  };
  
  const calculateNS = () => {
    if (!nsAge || !nsSum) return;
    
    const ageNum = parseInt(nsAge);
    const sumNum = parseInt(nsSum);
    let baseRate = 0.02; // 2% от страховой суммы
    
    // Коэффициент по возрасту
    const ageMultiplier = ageNum < 40 ? 0.8 : ageNum > 60 ? 1.5 : 1.0;
    
    const finalCost = Math.round(sumNum * baseRate * ageMultiplier);
    setNsPrice(finalCost);
  };
  
  const handleCalculatorClick = (calculatorType: string) => {
    setActiveCalculator(calculatorType);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleConsultationSubmit = () => {
    // Здесь можно добавить логику отправки формы
    console.log('Заявка на консультацию:', {
      name: consultationName,
      phone: consultationPhone,
      service: consultationService
    });
    
    // Очистка формы и закрытие модального окна
    setConsultationName('');
    setConsultationPhone('');
    setConsultationService('ОСАГО');
    setIsConsultationOpen(false);
  };

  const services = [
    {
      title: "ОСАГО",
      description: "Обязательное страхование автогражданской ответственности",
      icon: "Car",
      features: ["Быстрое оформление", "Онлайн расчет", "Скидки постоянным клиентам"]
    },
    {
      title: "КАСКО",
      description: "Добровольное страхование автомобиля",
      icon: "Shield",
      features: ["Защита от угона", "Ремонт у дилера", "Выплата без справок"]
    },
    {
      title: "Страхование жизни",
      description: "Накопительное и рисковое страхование",
      icon: "Heart",
      features: ["Семейные программы", "Инвестиционный доход", "Налоговые льготы"]
    },
    {
      title: "Страхование имущества",
      description: "Квартиры, дома, дачи",
      icon: "Home",
      features: ["От пожара и затопления", "Страхование ремонта", "Круглосуточная поддержка"]
    },
    {
      title: "Страхование путешествий",
      description: "Медицинская страховка для поездок",
      icon: "Plane",
      features: ["Медрасходы за рубежом", "Отмена поездки", "Потеря багажа"]
    },
    {
      title: "ДМС",
      description: "Добровольное медицинское страхование",
      icon: "Stethoscope",
      features: ["Лучшие клиники", "Прикрепление к врачам", "Комплексные обследования"]
    },
    {
      title: "НС",
      description: "Несчастные случаи",
      icon: "AlertTriangle",
      features: ["Травмы и увечья", "Быстрые выплаты", "Круглосуточная поддержка"]
    }
  ];

  const reviews = [
    {
      name: "Андрей Козлов",
      text: "Мария помогла быстро оформить ОСАГО. Всё объяснила доступно, цена оказалась выгодной.",
      rating: 5,
      service: "ОСАГО"
    },
    {
      name: "Елена Смирнова", 
      text: "Отличный специалист! Подобрала оптимальную программу страхования жизни для всей семьи.",
      rating: 5,
      service: "Страхование жизни"
    },
    {
      name: "Михаил Петров",
      text: "Профессиональный подход, быстрое решение вопросов. Рекомендую!",
      rating: 5,
      service: "КАСКО"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-open-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Shield" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-primary">Страхование от А до Я</h1>
                <p className="text-sm text-muted-foreground">с Марией Пармузиной • 24/7 онлайн</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <nav className="flex items-center space-x-4">
                <a href="#services" className="text-foreground hover:text-primary transition-colors text-sm">Услуги</a>
                <a href="#reviews" className="text-foreground hover:text-primary transition-colors text-sm">Отзывы</a>
                <a href="#contacts" className="text-foreground hover:text-primary transition-colors text-sm">Контакты</a>
              </nav>
              
              {/* Кнопки калькуляторов */}
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCalculatorClick('OSAGO')}
                >
                  ОСАГО
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCalculatorClick('KASKO')}
                >
                  КАСКО
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCalculatorClick('PROPERTY')}
                >
                  Дом
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleCalculatorClick('TRAVEL')}
                >
                  Путешествия
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-green-500 text-white mb-4">Сертифицированный агент РЕСО-Гарантия</Badge>
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 leading-tight">
                Надёжное страхование для вашего спокойствия
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Подбираю страховку точно под ваши нужды и бюджет. 
                Работаю онлайн 24/7 для вашего удобства.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold"
                  onClick={() => handleCalculatorClick('OSAGO')}
                >
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Рассчитать ОСАГО
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-500 text-white hover:bg-green-600 font-semibold"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Получить консультацию
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-3xl opacity-30"></div>
                <img 
                  src="https://cdn.poehali.dev/files/ec00c872-3396-4f06-ac5f-3a2813fdef43.jpg" 
                  alt="Мария Пармузина - страховой агент"
                  className="relative w-80 h-80 object-cover rounded-full border-8 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-8 text-foreground">О компании РЕСО-Гарантия</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">№1 в России</h3>
                <p className="text-muted-foreground">Лидер страхового рынка по ОСАГО</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">15+ млн клиентов</h3>
                <p className="text-muted-foreground">Доверяют нашим услугам</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3000+ офисов</h3>
                <p className="text-muted-foreground">По всей России</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр страховых услуг от надежного партнера
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon} className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl mb-4">Калькуляторы страхования</h2>
              <p className="text-xl text-muted-foreground">
                Рассчитайте стоимость любого вида страхования
              </p>
            </div>
            
            {/* Calculator Tabs */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {[
                { id: 'OSAGO', label: 'ОСАГО', icon: 'Car' },
                { id: 'KASKO', label: 'КАСКО', icon: 'Shield' },
                { id: 'LIFE', label: 'Страхование жизни', icon: 'Heart' },
                { id: 'PROPERTY', label: 'Имущество', icon: 'Home' },
                { id: 'TRAVEL', label: 'Путешествия', icon: 'Plane' },
                { id: 'DMS', label: 'ДМС', icon: 'Stethoscope' },
                { id: 'NS', label: 'НС', icon: 'AlertTriangle' }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeCalculator === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveCalculator(tab.id)}
                  className="flex items-center space-x-2 text-xs sm:text-sm"
                  size="sm"
                >
                  <Icon name={tab.icon} className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.id}</span>
                </Button>
              ))}
            </div>
            
            {/* ОСАГО Calculator */}
            {activeCalculator === 'OSAGO' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Car" className="w-6 h-6 mr-2 text-primary" />
                    Расчет стоимости ОСАГО
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="power">Мощность двигателя (л.с.)</Label>
                      <Input
                        id="power"
                        type="number"
                        value={carPower}
                        onChange={(e) => setCarPower(e.target.value)}
                        placeholder="Например, 120"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Возраст водителя</Label>
                      <Input
                        id="age"
                        type="number"
                        value={driverAge}
                        onChange={(e) => setDriverAge(e.target.value)}
                        placeholder="Например, 30"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateOSAGO} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать ОСАГО
                  </Button>
                  
                  {calculatedPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {calculatedPrice.toLocaleString()} ₽
                      </h3>
                      <p className="text-muted-foreground mb-4">Ориентировочная стоимость ОСАГО</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* КАСКО Calculator */}
            {activeCalculator === 'KASKO' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Shield" className="w-6 h-6 mr-2 text-primary" />
                    Расчет стоимости КАСКО
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carValue">Стоимость автомобиля (₽)</Label>
                      <Input
                        id="carValue"
                        type="number"
                        value={carValue}
                        onChange={(e) => setCarValue(e.target.value)}
                        placeholder="Например, 1500000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carAge">Возраст автомобиля (лет)</Label>
                      <Input
                        id="carAge"
                        type="number"
                        value={carAge}
                        onChange={(e) => setCarAge(e.target.value)}
                        placeholder="Например, 3"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateKASKO} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать КАСКО
                  </Button>
                  
                  {kaskoPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {kaskoPrice.toLocaleString()} ₽
                      </h3>
                      <p className="text-muted-foreground mb-4">Ориентировочная стоимость КАСКО</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Life Insurance Calculator */}
            {activeCalculator === 'LIFE' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Heart" className="w-6 h-6 mr-2 text-primary" />
                    Расчет страхования жизни
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="personAge">Возраст страхуемого (лет)</Label>
                      <Input
                        id="personAge"
                        type="number"
                        value={personAge}
                        onChange={(e) => setPersonAge(e.target.value)}
                        placeholder="Например, 35"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insuranceSum">Страховая сумма (₽)</Label>
                      <Input
                        id="insuranceSum"
                        type="number"
                        value={insuranceSum}
                        onChange={(e) => setInsuranceSum(e.target.value)}
                        placeholder="Например, 2000000"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateLife} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  
                  {lifePrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {lifePrice.toLocaleString()} ₽/год
                      </h3>
                      <p className="text-muted-foreground mb-4">Годовая страховая премия</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Property Insurance Calculator */}
            {activeCalculator === 'PROPERTY' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Home" className="w-6 h-6 mr-2 text-primary" />
                    Расчет страхования имущества
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="propertyValue">Стоимость имущества (₽)</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                        placeholder="Например, 8000000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyArea">Площадь (м²)</Label>
                      <Input
                        id="propertyArea"
                        type="number"
                        value={propertyArea}
                        onChange={(e) => setPropertyArea(e.target.value)}
                        placeholder="Например, 85"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyType">Тип недвижимости</Label>
                      <select 
                        id="propertyType"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full p-3 border rounded-md border-input bg-background"
                      >
                        <option value="apartment">Квартира</option>
                        <option value="house">Дом</option>
                        <option value="dacha">Дача</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button onClick={calculateProperty} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  
                  {propertyPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {propertyPrice.toLocaleString()} ₽/год
                      </h3>
                      <p className="text-muted-foreground mb-4">Годовая страховая премия</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Travel Insurance Calculator */}
            {activeCalculator === 'TRAVEL' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Plane" className="w-6 h-6 mr-2 text-primary" />
                    Расчет страхования путешествий
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="travelDays">Количество дней</Label>
                      <Input
                        id="travelDays"
                        type="number"
                        value={travelDays}
                        onChange={(e) => setTravelDays(e.target.value)}
                        placeholder="Например, 14"
                      />
                    </div>
                    <div>
                      <Label htmlFor="travelersCount">Количество путешественников</Label>
                      <Input
                        id="travelersCount"
                        type="number"
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(e.target.value)}
                        placeholder="Например, 2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="travelCountry">Направление</Label>
                      <select 
                        id="travelCountry"
                        value={travelCountry}
                        onChange={(e) => setTravelCountry(e.target.value)}
                        className="w-full p-3 border rounded-md border-input bg-background"
                      >
                        <option value="russia">Россия</option>
                        <option value="schengen">Шенген</option>
                        <option value="usa">США/Канада</option>
                        <option value="asia">Азия</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button onClick={calculateTravel} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  
                  {travelPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {travelPrice.toLocaleString()} ₽
                      </h3>
                      <p className="text-muted-foreground mb-4">Стоимость страховки путешествий</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* DMS Calculator */}
            {activeCalculator === 'DMS' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Stethoscope" className="w-6 h-6 mr-2 text-primary" />
                    Расчет ДМС
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dmsAge">Возраст (лет)</Label>
                      <Input
                        id="dmsAge"
                        type="number"
                        value={dmsAge}
                        onChange={(e) => setDmsAge(e.target.value)}
                        placeholder="Например, 35"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dmsPlan">План обслуживания</Label>
                      <select 
                        id="dmsPlan"
                        value={dmsPlan}
                        onChange={(e) => setDmsPlan(e.target.value)}
                        className="w-full p-3 border rounded-md border-input bg-background"
                      >
                        <option value="basic">Базовый</option>
                        <option value="standard">Стандарт</option>
                        <option value="premium">Премиум</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button onClick={calculateDMS} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  
                  {dmsPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {dmsPrice.toLocaleString()} ₽/год
                      </h3>
                      <p className="text-muted-foreground mb-4">Годовое обслуживание по ДМС</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* NS Calculator */}
            {activeCalculator === 'NS' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="AlertTriangle" className="w-6 h-6 mr-2 text-primary" />
                    Расчет страхования от НС
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nsAge">Возраст (лет)</Label>
                      <Input
                        id="nsAge"
                        type="number"
                        value={nsAge}
                        onChange={(e) => setNsAge(e.target.value)}
                        placeholder="Например, 35"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nsSum">Страховая сумма (₽)</Label>
                      <Input
                        id="nsSum"
                        type="number"
                        value={nsSum}
                        onChange={(e) => setNsSum(e.target.value)}
                        placeholder="Например, 1000000"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateNS} className="w-full" size="lg">
                    <Icon name="Calculator" className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  
                  {nsPrice && (
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-montserrat font-bold text-2xl text-primary mb-2">
                        {nsPrice.toLocaleString()} ₽/год
                      </h3>
                      <p className="text-muted-foreground mb-4">Годовая страховая премия от НС</p>
                      <Button size="lg">
                        <Icon name="Phone" className="w-5 h-5 mr-2" />
                        Оформить полис
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">
              Что говорят о нашей работе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <Badge variant="outline">{review.service}</Badge>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь со мной удобным способом
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-montserrat font-semibold text-xl mb-6">Мария Пармузина</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Icon name="Phone" className="w-5 h-5 text-primary mr-3" />
                    <span>+7-911-938-01-00</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Mail" className="w-5 h-5 text-primary mr-3" />
                    <span>m.parmuzina@yandex.ru</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" className="w-5 h-5 text-primary mr-3" />
                    <span>Санкт-Петербург, Щербаков переулок 17а</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="w-5 h-5 text-primary mr-3" />
                    <span>Пн-Вс: 24/7 онлайн</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h4 className="font-semibold mb-3">Преимущества работы со мной:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
Подбор страховки под ваши нужды
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Бесплатная консультация
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Оформление полисов на дому
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Помощь при наступлении страхового случая
                    </li>
                  </ul>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Обратная связь</CardTitle>
                  <CardDescription>
                    Оставьте заявку и я свяжусь с вами в течение часа
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="service">Интересующая услуга</Label>
                    <Input id="service" placeholder="ОСАГО, КАСКО, Страхование жизни..." />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Расскажите о ваших потребностях..." />
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="Send" className="w-5 h-5 mr-2" />
                    Отправить заявку
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-montserrat font-bold text-xl">Получить консультацию</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsConsultationOpen(false)}
              >
                <Icon name="X" className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="consultationName">Имя</Label>
                <Input
                  id="consultationName"
                  value={consultationName}
                  onChange={(e) => setConsultationName(e.target.value)}
                  placeholder="Ваше имя"
                />
              </div>
              
              <div>
                <Label htmlFor="consultationPhone">Телефон</Label>
                <Input
                  id="consultationPhone"
                  value={consultationPhone}
                  onChange={(e) => setConsultationPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div>
                <Label htmlFor="consultationService">Вид страхования</Label>
                <select 
                  id="consultationService"
                  value={consultationService}
                  onChange={(e) => setConsultationService(e.target.value)}
                  className="w-full p-3 border rounded-md border-input bg-background"
                >
                  <option value="ОСАГО">ОСАГО</option>
                  <option value="КАСКО">КАСКО</option>
                  <option value="Страхование жизни">Страхование жизни</option>
                  <option value="Страхование имущества">Страхование имущества</option>
                  <option value="Страхование путешествий">Страхование путешествий</option>
                  <option value="ДМС">ДМС</option>
                  <option value="НС">НС (Несчастные случаи)</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsConsultationOpen(false)}
                >
                  Отмена
                </Button>
                <Button 
                  className="flex-1 bg-primary"
                  onClick={handleConsultationSubmit}
                  disabled={!consultationName || !consultationPhone}
                >
                  Отправить заявку
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Shield" className="w-6 h-6" />
              <h3 className="font-montserrat font-bold text-xl">Страхование от А до Я</h3>
            </div>
            <p className="text-green-100 mb-4">
              Мария Пармузина - сертифицированный агент РЕСО-Гарантия
            </p>
            <p className="text-sm text-green-200">
              © 2024 Все права защищены. Лицензия ЦБ РФ № 621
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;