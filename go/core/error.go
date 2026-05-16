package core

type KolnerAdressenError struct {
	IsKolnerAdressenError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKolnerAdressenError(code string, msg string, ctx *Context) *KolnerAdressenError {
	return &KolnerAdressenError{
		IsKolnerAdressenError: true,
		Sdk:              "KolnerAdressen",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KolnerAdressenError) Error() string {
	return e.Msg
}
