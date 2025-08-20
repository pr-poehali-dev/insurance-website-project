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
  const [carPower, setCarPower] = useState('');
  const [driverAge, setDriverAge] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculateOSAGO = () => {
    if (!carPower || !driverAge) return;
    
    const baseCost = 5000;
    const powerMultiplier = parseInt(carPower) > 150 ? 1.5 : 1.2;
    const ageMultiplier = parseInt(driverAge) < 25 ? 1.8 : parseInt(driverAge) > 50 ? 0.9 : 1.0;
    
    const finalCost = Math.round(baseCost * powerMultiplier * ageMultiplier);
    setCalculatedPrice(finalCost);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-open-sans">
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
                <p className="text-sm text-muted-foreground">с Марией Пармузиной</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#calculator" className="text-foreground hover:text-primary transition-colors">Калькулятор</a>
              <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-blue-500 text-white mb-4">Сертифицированный агент РЕСО-Гарантия</Badge>
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 leading-tight">
                Надёжное страхование для вашего спокойствия
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Более 8 лет помогаю клиентам выбрать оптимальные страховые решения. 
                Индивидуальный подход, выгодные условия и быстрое оформление полисов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Рассчитать ОСАГО
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Получить консультацию
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl opacity-30"></div>
                <img 
                  src="/img/0ec90fb1-268c-488c-adfc-e214f3c0653d.jpg" 
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl mb-4">Калькулятор ОСАГО</h2>
              <p className="text-xl text-muted-foreground">
                Рассчитайте стоимость полиса за 30 секунд
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Calculator" className="w-6 h-6 mr-2 text-primary" />
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
                  Рассчитать стоимость
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
                    <span>+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Mail" className="w-5 h-5 text-primary mr-3" />
                    <span>maria.parmuzina@reso.ru</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" className="w-5 h-5 text-primary mr-3" />
                    <span>Москва, ул. Тверская, 15</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="w-5 h-5 text-primary mr-3" />
                    <span>Пн-Пт: 9:00-19:00, Сб: 10:00-16:00</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h4 className="font-semibold mb-3">Преимущества работы со мной:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Icon name="Check" className="w-4 h-4 text-green-500 mr-2" />
                      8+ лет опыта в страховании
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

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Icon name="Shield" className="w-6 h-6" />
              <h3 className="font-montserrat font-bold text-xl">Страхование от А до Я</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Мария Пармузина - сертифицированный агент РЕСО-Гарантия
            </p>
            <p className="text-sm text-blue-200">
              © 2024 Все права защищены. Лицензия ЦБ РФ № 621
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;